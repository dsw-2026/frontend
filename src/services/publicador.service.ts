import { httpClient } from '../api/httpClient'
import type { Publicador, PublicadorInput } from '../models/publicador'

const BASE_PATH = '/publicadores'

export const publicadorService = {
  getAll: () => httpClient.get<Publicador[]>(BASE_PATH),
  getById: (id: number) => httpClient.get<Publicador>(`${BASE_PATH}/${id}`),
  create: (input: PublicadorInput) => httpClient.post<Publicador>(BASE_PATH, input),
  update: (id: number, input: PublicadorInput) => httpClient.put<Publicador>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}
