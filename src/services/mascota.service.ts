import { httpClient } from '../api/httpClient'
import type { Mascota, MascotaInput } from '../models/mascota'

const BASE_PATH = '/mascotas'

export const mascotaService = {
  getAll: (estado?: string) => httpClient.get<Mascota[]>(estado ? `${BASE_PATH}?estado=${estado}` : BASE_PATH),
  getById: (id: number) => httpClient.get<Mascota>(`${BASE_PATH}/${id}`),
  create: (input: MascotaInput) => httpClient.post<Mascota>(BASE_PATH, input),
  update: (id: number, input: MascotaInput) => httpClient.put<Mascota>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}
