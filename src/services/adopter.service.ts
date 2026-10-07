import { httpClient } from '../api/httpClient'
import type { Adopter, AdopterInput } from '../models/adopter'

const BASE_PATH = '/adopters'

export const adopterService = {
  getAll: () => httpClient.get<Adopter[]>(BASE_PATH),
  getById: (id: number) => httpClient.get<Adopter>(`${BASE_PATH}/${id}`),
  create: (input: AdopterInput) => httpClient.post<Adopter>(BASE_PATH, input),
  update: (id: number, input: AdopterInput) => httpClient.put<Adopter>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}