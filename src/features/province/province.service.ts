import { httpClient } from '@/shared/api/httpClient'
import type { Province, ProvinceInput } from './province.model'

const BASE_PATH = '/provinces'

export const provinceService = {
  getAll: () => httpClient.get<Province[]>(BASE_PATH),
  getById: (id: number) => httpClient.get<Province>(`${BASE_PATH}/${id}`),
  create: (input: ProvinceInput) => httpClient.post<Province>(BASE_PATH, input),
  update: (id: number, input: ProvinceInput) => httpClient.put<Province>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}