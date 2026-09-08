import { httpClient } from '../api/httpClient'
import type { Mascota, MascotaInput } from '../models/mascota'

const BASE_PATH = '/mascotas'

export const mascotaService = {
  // Los filtros son opcionales e independientes: sin ninguno trae todas.
  // publicador lo usa la pantalla de gestión, donde cada Publicador ve
  // solo las suyas.
  getAll: (estado?: string, publicador?: number) => {
    const params = new URLSearchParams()
    if (estado) params.set('estado', estado)
    if (publicador) params.set('publicador', String(publicador))
    const query = params.toString()
    return httpClient.get<Mascota[]>(query ? `${BASE_PATH}?${query}` : BASE_PATH)
  },
  getById: (id: number) => httpClient.get<Mascota>(`${BASE_PATH}/${id}`),
  create: (input: MascotaInput) => httpClient.post<Mascota>(BASE_PATH, input),
  update: (id: number, input: MascotaInput) => httpClient.put<Mascota>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}
