import { PublisherType, type Publisher } from '../../../../models/publisher'

export interface PublisherFormValues {
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
  type: PublisherType | ''
  website: string
  openingHours: string
  instagram: string
  facebook: string
  whatsapp: string
}

export const PUBLISHER_TYPE_LABELS: Record<PublisherType, string> = {
  [PublisherType.SHELTER]: 'Refugio',
  [PublisherType.INDEPENDENT_RESCUER]: 'Rescatista independiente',
  [PublisherType.FOSTER_HOME]: 'Hogar de tránsito',
}

export function publisherToFormValues(publisher: Publisher): PublisherFormValues {
  return {
    username: publisher.username,
    firstName: publisher.firstName,
    lastName: publisher.lastName,
    email: publisher.email,
    phone: publisher.phone ?? '',
    description: publisher.description ?? '',
    address: publisher.address ?? '',
    profilePhoto: publisher.profilePhoto ?? '',
    localityId: publisher.locality?.id ?? '',
    verified: publisher.verified,
    type: publisher.type ?? '',
    website: publisher.website ?? '',
    openingHours: publisher.openingHours ?? '',
    instagram: publisher.socialMedia?.instagram ?? '',
    facebook: publisher.socialMedia?.facebook ?? '',
    whatsapp: publisher.socialMedia?.whatsapp ?? '',
  }
}