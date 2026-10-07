import { adopterService } from '../../../../services/adopter.service'

export function loadAllAdopters() {
  return adopterService.getAll()
}

export function deleteAdopter(id: number) {
  return adopterService.remove(id)
}