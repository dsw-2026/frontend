import type { Locality } from '@/features/locality/locality.model'

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
  hasYard?: boolean
  hasOtherAnimals?: boolean
  otherAnimalsDetail?: string
  hasChildren?: boolean
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
  hasYard?: boolean
  hasOtherAnimals?: boolean
  otherAnimalsDetail?: string
  hasChildren?: boolean
}