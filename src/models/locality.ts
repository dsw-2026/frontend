import type { Province } from './province'

export interface Locality {
  id: number
  name: string
  postalCode: string
  province: Province
}

export interface LocalityInput {
  name: string
  postalCode: string
  province: number
}