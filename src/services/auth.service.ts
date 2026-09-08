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

// Los datos completos del usuario logueado, que devuelve GET /api/auth/me.
// tipoUsuario es 'Publicador' | 'Adoptante' | 'Admin' (lo agrega el backend
// con constructor.name). Se usa para mostrar/ocultar opciones según el rol.
export interface UsuarioActual {
  id: number
  nombreUsuario: string
  nombre: string
  apellido: string
  email: string
  tipoUsuario: string
}

export const authService = {
  login: (input: LoginInput) => httpClient.post<LoginResponse>('/auth/login', input),
  // Consulta quién es el usuario logueado, usando la cookie. Sirve para
  // recuperar la sesión al recargar la página (la cookie sobrevive, pero
  // el estado de React se reinicia).
  getPerfil: () => httpClient.get<UsuarioActual>('/auth/me'),
}