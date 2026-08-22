import { httpClient } from '../api/httpClient'
import type { Especie, EspecieInput } from '../models/especie'

const BASE_PATH = '/especies'

// Un método por operación del CRUD, calcado 1:1 a especie.routes.ts del
// backend. Las páginas (ver EspeciesListPage, EspecieFormPage) llaman a
// estas funciones, nunca a httpClient directamente.
export const especieService = {
  getAll: () => httpClient.get<Especie[]>(BASE_PATH),
  getById: (id: number) => httpClient.get<Especie>(`${BASE_PATH}/${id}`),
  create: (input: EspecieInput) => httpClient.post<Especie>(BASE_PATH, input),
  update: (id: number, input: EspecieInput) => httpClient.put<Especie>(`${BASE_PATH}/${id}`, input),
  remove: (id: number) => httpClient.delete<{ message: string }>(`${BASE_PATH}/${id}`),
}
