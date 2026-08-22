import { httpClient } from '../api/httpClient'
import type { Provincia, ProvinciaInput } from '../models/provincia'

const BASE_PATH = '/provincias'

export const provinciaService = {
  getAll: () => httpClient.get<Provincia[]>(BASE_PATH),
  getById: (id: number) => httpClient.get<Provincia>(`${BASE_PATH}/${id}`),
  create: (input: ProvinciaInput) => httpClient.post<Provincia>(BASE_PATH, input),
  update: (id: number, input: ProvinciaInput) => httpClient.put<Provincia>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}
