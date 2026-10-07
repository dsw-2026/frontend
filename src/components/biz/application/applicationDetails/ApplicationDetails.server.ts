import { applicationService } from '../../../../services/application.service'

export function loadApplication(id: number) {
  return applicationService.getById(id)
}

export function approveApplication(id: number) {
  return applicationService.approve(id)
}

export function rejectApplication(id: number) {
  return applicationService.reject(id)
}