import { httpClient } from '../api/httpClient'
import type { Application, ApplicationInput, ApplicationStatus } from '../models/application'

const BASE_PATH = '/applications'

export const applicationService = {
  getAll: (status?: ApplicationStatus) =>
    httpClient.get<Application[]>(status ? `${BASE_PATH}?status=${status}` : BASE_PATH),
  getById: (id: number) => httpClient.get<Application>(`${BASE_PATH}/${id}`),
  create: (input: ApplicationInput) => httpClient.post<Application>(BASE_PATH, input),
  approve: (id: number) => httpClient.patch<Application>(`${BASE_PATH}/${id}/approve`, {}),
  reject: (id: number) => httpClient.patch<Application>(`${BASE_PATH}/${id}/reject`, {}),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}