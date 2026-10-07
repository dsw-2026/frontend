import { HousingType, type Adopter } from '../../../../models/adopter'

export interface AdopterFormValues {
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  description: string
  address: string
  profilePhoto: string
  localityId: number | ''
  verified: boolean
  occupation: string
  housingType: HousingType | ''
}

export const HOUSING_TYPE_LABELS: Record<HousingType, string> = {
  [HousingType.HOUSE]: 'Casa',
  [HousingType.APARTMENT]: 'Departamento',
  [HousingType.OTHER]: 'Otro',
}

export function adopterToFormValues(adopter: Adopter): AdopterFormValues {
  return {
    username: adopter.username,
    firstName: adopter.firstName,
    lastName: adopter.lastName,
    email: adopter.email,
    phone: adopter.phone ?? '',
    description: adopter.description ?? '',
    address: adopter.address ?? '',
    profilePhoto: adopter.profilePhoto ?? '',
    localityId: adopter.locality?.id ?? '',
    verified: adopter.verified,
    occupation: adopter.occupation ?? '',
    housingType: adopter.housingType ?? '',
  }
}