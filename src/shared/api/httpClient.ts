const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
  details?: { field: string; message: string }[]
}
export class ApiError extends Error {
  status: number
  details?: { field: string; message: string }[]
  constructor(message: string, status: number, details?: { field: string; message: string }[]) {
    super(message)
    this.status = status
    this.details = details
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  })

  const body = (await response.json()) as ApiEnvelope<T>

  if (!response.ok) {
    throw new ApiError(
      body.message ?? 'Ocurrió un error inesperado',
      response.status,
      body.details
    )
  }

  return body.data
}

export const httpClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) => request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  uploadFile: <T>(path: string, formData: FormData) => request<T>(path, { method: 'POST', body: formData }),
}

export const API_ORIGIN = API_URL.replace(/\/api\/?$/, '')