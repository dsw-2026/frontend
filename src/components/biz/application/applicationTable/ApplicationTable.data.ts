import type { ApplicationStatus } from '../../../../models/application'

export const STATUS_BADGE_CLASS: Record<ApplicationStatus, string> = {
  PENDING: 'badge-pending',
  APPROVED: 'badge-success',
  REJECTED: 'badge-danger',
}

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobada',
  REJECTED: 'Rechazada',
}