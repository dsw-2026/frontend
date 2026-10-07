import type { Locality } from './locality'

export const PublisherType = {
  SHELTER: 'SHELTER',
  INDEPENDENT_RESCUER: 'INDEPENDENT_RESCUER',
  FOSTER_HOME: 'FOSTER_HOME',
} as const
export type PublisherType = (typeof PublisherType)[keyof typeof PublisherType]

export interface Publisher {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  description?: string
  address?: string
  profilePhoto?: string
  locality?: Locality
  verified: boolean
  type?: PublisherType
  website?: string
  socialMedia?: Record<string, string>
  openingHours?: string
}

export interface PublisherInput {
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
  type?: PublisherType
  website?: string
  socialMedia?: Record<string, string>
  openingHours?: string
}