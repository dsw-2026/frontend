import type { UserType } from '../../../services/auth.service'

export function getDestinationByRole(userType: UserType) {
  if (userType === 'Admin') return '/publishers'
  if (userType === 'Publisher') return '/pets'
  return '/adopt'
}