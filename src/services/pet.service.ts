import { httpClient } from '../api/httpClient'
import type { Pet, PetInput, PetStatus } from '../models/pet'

const BASE_PATH = '/pets'

export const petService = {
  getAll: (status?: PetStatus, publisher?: number) => {
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    if (publisher) params.set('publisher', String(publisher))
    const query = params.toString()
    return httpClient.get<Pet[]>(query ? `${BASE_PATH}?${query}` : BASE_PATH)
  },
  getById: (id: number) => httpClient.get<Pet>(`${BASE_PATH}/${id}`),
  create: (input: PetInput) => httpClient.post<Pet>(BASE_PATH, input),
  update: (id: number, input: PetInput) => httpClient.put<Pet>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}