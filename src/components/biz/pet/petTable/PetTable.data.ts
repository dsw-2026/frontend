import type { PetStatus } from '../../../../models/pet'

export const STATUS_BADGE_CLASS: Record<PetStatus, string> = {
  AVAILABLE: 'badge-success',
  IN_PROCESS: 'badge-pending',
  ADOPTED: 'badge-pending',
  UNAVAILABLE: 'badge-pending',
}