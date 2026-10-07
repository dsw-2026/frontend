import { httpClient } from '../api/httpClient'
import type { Publisher, PublisherInput } from '../models/publisher'

const BASE_PATH = '/publishers'

export const publisherService = {
  getAll: () => httpClient.get<Publisher[]>(BASE_PATH),
  getById: (id: number) => httpClient.get<Publisher>(`${BASE_PATH}/${id}`),
  create: (input: PublisherInput) => httpClient.post<Publisher>(BASE_PATH, input),
  update: (id: number, input: PublisherInput) => httpClient.put<Publisher>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}