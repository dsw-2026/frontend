import type { Pet, EnergyLevel, Size, Tolerance } from '@/features/pet/pet.model'
import type { Adopter } from '@/features/adopter/adopter.model'

export const ApplicationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const
export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]

export interface Application {
  id: number
  status: ApplicationStatus
  applicationDate: string
  resolutionDate?: string
  message?: string
  desiredEnergyLevel: EnergyLevel
  desiredSize: Size
  desiredToleratesChildren: Tolerance
  desiredToleratesOtherAnimals: Tolerance
  desiredToleratesConfinement: Tolerance
  pet: Pet
  adopter: Adopter
}

export interface ApplicationInput {
  message?: string
  pet: number
  desiredEnergyLevel: EnergyLevel
  desiredSize: Size
  desiredToleratesChildren: Tolerance
  desiredToleratesOtherAnimals: Tolerance
  desiredToleratesConfinement: Tolerance
}