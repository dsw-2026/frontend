import { httpClient } from '../api/httpClient'
import type { Solicitud, SolicitudInput } from '../models/solicitud'

const BASE_PATH = '/solicitudes'

export const solicitudService = {
  getAll: (estado?: string) => httpClient.get<Solicitud[]>(estado ? `${BASE_PATH}?estado=${estado}` : BASE_PATH),
  getById: (id: number) => httpClient.get<Solicitud>(`${BASE_PATH}/${id}`),
  create: (input: SolicitudInput) => httpClient.post<Solicitud>(BASE_PATH, input),
  // Epic B: no llevan body, el id de la URL alcanza — el segundo
  // argumento de httpClient.patch se manda vacío.
  aprobar: (id: number) => httpClient.patch<Solicitud>(`${BASE_PATH}/${id}/aprobar`, {}),
  rechazar: (id: number) => httpClient.patch<Solicitud>(`${BASE_PATH}/${id}/rechazar`, {}),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}
