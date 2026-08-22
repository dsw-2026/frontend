// Base URL de la API. Se toma de una variable de entorno (ver .env.example)
// para no hardcodear "localhost:3000" en el código: en otra máquina, o en
// producción, solo hace falta cambiar el .env, no tocar código.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

// Forma en la que el backend envuelve todas sus respuestas
// (ver res.status(...).json({ message, data }) en los controllers).
interface ApiEnvelope<T> {
  message: string
  data: T
}

// Error tipado para poder distinguir "falló la red" de "el backend respondió
// con un error de negocio" (404, 409, etc.), y mostrar el mensaje real del
// backend en vez de uno genérico.
export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  // Algunos endpoints (ej. DELETE) devuelven un body sin "data" relevante;
  // igual lo parseamos porque el backend siempre responde JSON.
  const body = (await response.json()) as ApiEnvelope<T>

  if (!response.ok) {
    throw new ApiError(body.message ?? 'Ocurrió un error inesperado', response.status)
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
}
