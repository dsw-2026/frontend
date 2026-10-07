import type { Locality } from './locality'

export const HousingType = {
  HOUSE: 'HOUSE',
  APARTMENT: 'APARTMENT',
  OTHER: 'OTHER',
} as const
export type HousingType = (typeof HousingType)[keyof typeof HousingType]

export interface Adopter {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  description?: string
  address?: string
  profilePhoto?: string
  verified: boolean
  locality?: Locality
  occupation?: string
  housingType?: HousingType
}

export interface AdopterInput {
  username: string
  firstName: string
  lastName: string
  password?: string
  email: string
  phone?: string
  description?: string
  address?: string
  profilePhoto?: string
  locality?: number
  verified?: boolean
  occupation?: string
  housingType?: HousingType
}