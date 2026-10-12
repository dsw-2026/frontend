import { httpClient } from '@/shared/api/httpClient'
import type { Pet, PetInput, PetFilters } from './pet.model'

const BASE_PATH = '/pets'

export const petService = {
  getAll: (filters: PetFilters = {}) => {
  const params = new URLSearchParams()
  if (filters.status) params.set('status', filters.status)
  if (filters.species) params.set('species', String(filters.species))
  const query = params.toString()
  return httpClient.get<Pet[]>(query ? `${BASE_PATH}?${query}` : BASE_PATH)
},
  getById: (id: number) => httpClient.get<Pet>(`${BASE_PATH}/${id}`),
  create: (input: PetInput) => httpClient.post<Pet>(BASE_PATH, input),
  update: (id: number, input: PetInput) => httpClient.put<Pet>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}