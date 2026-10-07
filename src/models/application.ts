import type { Pet, EnergyLevel, Size, Tolerance } from './pet'
import type { Adopter } from './adopter'

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