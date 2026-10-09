import type { Province } from '@/features/province/province.model'

export interface Locality {
  id: number
  name: string
  postalCode: string
  province: Province
}

// Al crear/editar, la provincia va como id (número).
export interface LocalityInput {
  name: string
  postalCode: string
  province: number
}