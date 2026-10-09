import type { Species } from '@/features/species/species.model'
import type { Publisher } from '@/features/publisher/publisher.model'

export const Sex = { MALE: 'MALE', FEMALE: 'FEMALE' } as const
export type Sex = (typeof Sex)[keyof typeof Sex]

export const AgeUnit = { MONTHS: 'MONTHS', YEARS: 'YEARS' } as const
export type AgeUnit = (typeof AgeUnit)[keyof typeof AgeUnit]

export const PetStatus = {
  AVAILABLE: 'AVAILABLE',
  IN_PROCESS: 'IN_PROCESS',
  ADOPTED: 'ADOPTED',
  UNAVAILABLE: 'UNAVAILABLE',
} as const
export type PetStatus = (typeof PetStatus)[keyof typeof PetStatus]

export const Size = {
  SMALL: 'SMALL', MEDIUM: 'MEDIUM', LARGE: 'LARGE', GIANT: 'GIANT',
} as const
export type Size = (typeof Size)[keyof typeof Size]

export const EnergyLevel = { LOW: 'LOW', MEDIUM: 'MEDIUM', HIGH: 'HIGH' } as const
export type EnergyLevel = (typeof EnergyLevel)[keyof typeof EnergyLevel]

export const Tolerance = { YES: 'YES', NO: 'NO', UNKNOWN: 'UNKNOWN' } as const
export type Tolerance = (typeof Tolerance)[keyof typeof Tolerance]

export interface Characteristic {
  id: number
  energyLevel: EnergyLevel
  temperament: string
  size: Size
  vaccinated: boolean
  neutered: boolean
  toleratesChildren: Tolerance
  toleratesOtherAnimals: Tolerance
  toleratesConfinement: Tolerance
  additionalNotes?: string
}

export interface Pet {
  id: number
  name: string
  sex: Sex
  age: number
  ageUnit: AgeUnit
  status: PetStatus
  admissionDate: string
  photo?: string
  species: Species
  publisher: Publisher
  characteristic: Characteristic
}

export interface PetInput {
  name: string
  sex: Sex
  age: number
  ageUnit: AgeUnit
  status: PetStatus
  photo?: string
  species: number
  energyLevel: EnergyLevel
  temperament: string
  size: Size
  vaccinated: boolean
  neutered: boolean
  toleratesChildren: Tolerance
  toleratesOtherAnimals: Tolerance
  toleratesConfinement: Tolerance
  additionalNotes?: string
}