import { httpClient } from '../api/httpClient'
import type { Localidad, LocalidadInput } from '../models/localidad'

const BASE_PATH = '/localidades'

export const localidadService = {
  getAll: () => httpClient.get<Localidad[]>(BASE_PATH),
  getById: (id: number) => httpClient.get<Localidad>(`${BASE_PATH}/${id}`),
  create: (input: LocalidadInput) => httpClient.post<Localidad>(BASE_PATH, input),
  update: (id: number, input: LocalidadInput) => httpClient.put<Localidad>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}
