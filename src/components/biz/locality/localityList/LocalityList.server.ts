import { localityService } from '../../../../services/locality.service'

export function loadAllLocalities() {
  return localityService.getAll()
}

export function deleteLocality(id: number) {
  return localityService.remove(id)
}