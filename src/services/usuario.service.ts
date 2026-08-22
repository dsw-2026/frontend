import { httpClient } from '../api/httpClient'

const BASE_PATH = '/usuarios'

// PATCH /api/usuarios/:id/verificar vive en el router base de Usuario
// (usuario.routes.ts), no en el de Publicador ni Adoptante — pero como
// ambos heredan de Usuario y comparten la misma tabla, el mismo id sirve
// para verificar un registro sin importar de qué subtipo sea.
export const usuarioService = {
  verificar: (id: number) => httpClient.patch<{ message: string }>(`${BASE_PATH}/${id}/verificar`, {}),
}
