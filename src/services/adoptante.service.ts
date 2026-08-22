import { httpClient } from '../api/httpClient'
import type { Adoptante, AdoptanteInput } from '../models/adoptante'

const BASE_PATH = '/adoptantes'

export const adoptanteService = {
  getAll: () => httpClient.get<Adoptante[]>(BASE_PATH),
  getById: (id: number) => httpClient.get<Adoptante>(`${BASE_PATH}/${id}`),
  create: (input: AdoptanteInput) => httpClient.post<Adoptante>(BASE_PATH, input),
  update: (id: number, input: AdoptanteInput) => httpClient.put<Adoptante>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}
