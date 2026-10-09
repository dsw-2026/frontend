import { httpClient } from '@/shared/api/httpClient'
import type { Application, ApplicationInput } from './application.model'

const BASE_PATH = '/applications'

export const applicationService = {
  getAll: (status?: string) => {
    const query = status ? `?status=${status}` : ''
    return httpClient.get<Application[]>(`${BASE_PATH}${query}`)
  },
  getById: (id: number) => httpClient.get<Application>(`${BASE_PATH}/${id}`),
  create: (input: ApplicationInput) => httpClient.post<Application>(BASE_PATH, input),
  approve: (id: number) => httpClient.patch<Application>(`${BASE_PATH}/${id}/approve`, {}),
  reject: (id: number) => httpClient.patch<Application>(`${BASE_PATH}/${id}/reject`, {}),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}