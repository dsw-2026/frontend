// Base URL de la API. Se toma de una variable de entorno (ver .env.example)
// para no hardcodear "localhost:3000" en el código: en otra máquina, o en
// producción, solo hace falta cambiar el .env, no tocar código.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

// Forma en la que el backend envuelve todas sus respuestas
// (ver res.status(...).json({ message, data }) en los controllers).
// "field" es opcional: solo viene en errores 409 de conflicto de
// unicidad (ver ConflictoUnicidadError en el backend), para poder
// marcar el campo puntual que chocó en vez de un error genérico.
interface ApiEnvelope<T> {
  message: string
  data: T
  field?: string
}

// Error tipado para poder distinguir "falló la red" de "el backend respondió
// con un error de negocio" (404, 409, etc.), y mostrar el mensaje real del
// backend en vez de uno genérico.
export class ApiError extends Error {
  status: number
  field?: string
  constructor(message: string, status: number, field?: string) {
    super(message)
    this.status = status
    this.field = field
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  // Si el body es un FormData (subida de archivo), NO hay que fijar
  // Content-Type manualmente: el navegador arma el header
  // "multipart/form-data; boundary=..." solo, con el boundary correcto.
  // Si lo pisamos con "application/json", el backend no puede parsear
  // el archivo.
  const esFormData = options.body instanceof FormData

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    // Envía las cookies (incluida la de autenticación httpOnly) aunque la
    // petición vaya a otro origen (frontend en :5173, backend en :3000).
    // Sin esto, fetch no manda la cookie del token y el backend responde 401.
    credentials: 'include',
    headers: {
      ...(!esFormData && { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  })

  // Algunos endpoints (ej. DELETE) devuelven un body sin "data" relevante;
  // igual lo parseamos porque el backend siempre responde JSON.
  const body = (await response.json()) as ApiEnvelope<T>

  if (!response.ok) {
    throw new ApiError(body.message ?? 'Ocurrió un error inesperado', response.status, body.field)
  }

  return body.data
}

// Un método por verbo HTTP, cada uno tipado con el T que devuelve el
// endpoint. Los services (ver especie.service.ts) son los únicos que
// deberían importar esto — los componentes nunca hablan con la API directo.
export const httpClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) => request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  // Para subir archivos: el FormData va tal cual como body, sin
  // JSON.stringify (rompería el archivo) y sin forzar Content-Type
  // (ver el chequeo esFormData de arriba).
  uploadFile: <T>(path: string, formData: FormData) => request<T>(path, { method: 'POST', body: formData }),
}

export const API_ORIGIN = API_URL.replace(/\/api\/?$/, '')

// El backend devuelve URLs de archivos como rutas relativas
// (ej: "/uploads/x.png",