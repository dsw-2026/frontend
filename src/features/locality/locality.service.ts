import { httpClient } from '@/shared/api/httpClient'
import type { Locality, LocalityInput } from './locality.model'

const BASE_PATH = '/localities'

export const localityService = {
  getAll: () => httpClient.get<Locality[]>(BASE_PATH),
  getById: (id: number) => httpClient.get<Locality>(`${BASE_PATH}/${id}`),
  create: (input: LocalityInput) => httpClient.post<Locality>(BASE_PATH, input),
  update: (id: number, input: LocalityInput) => httpClient.put<Locality>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}