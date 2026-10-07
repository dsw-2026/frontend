import { httpClient } from '../api/httpClient'
import type { Species, SpeciesInput } from '../models/species'

const BASE_PATH = '/species'

export const speciesService = {
  getAll: () => httpClient.get<Species[]>(BASE_PATH),
  getById: (id: number) => httpClient.get<Species>(`${BASE_PATH}/${id}`),
  create: (input: SpeciesInput) => httpClient.post<Species>(BASE_PATH, input),
  update: (id: number, input: SpeciesInput) => httpClient.put<Species>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}