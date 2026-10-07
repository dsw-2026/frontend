import { applicationService } from '../../../../services/application.service'

export function loadApplications() {
  return applicationService.getAll()
}

export function approveApplication(id: number) {
  return applicationService.approve(id)
}

export function rejectApplication(id: number) {
  return applicationService.reject(id)
}

export function deleteApplication(id: number) {
  return applicationService.remove(id)
}