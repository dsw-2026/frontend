import { httpClient } from '../api/httpClient'

// Lo que se envía al backend para iniciar sesión.
interface LoginInput {
  email: string
  contrasena: string
}

// Lo que el backend devuelve tras un login exitoso. Ya NO incluye el
// token: ese viaja en una cookie httpOnly que el navegador maneja solo.
interface LoginResponse {
  id: number
  nombreUsuario: string
}

export const authService = {
  login: (input: LoginInput) => httpClient.post<LoginResponse>('/auth/login', input),
}