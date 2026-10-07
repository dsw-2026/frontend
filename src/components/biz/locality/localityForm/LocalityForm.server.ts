import { localityService } from '../../../../services/locality.service'
import { provinceService } from '../../../../services/province.service'
import type { LocalityInput } from '../../../../models/locality'

export async function loadLocalityFormData(id?: number) {
  const [provinces, locality] = await Promise.all([
    provinceService.getAll(),
    id !== undefined ? localityService.getById(id) : Promise.resolve(null),
  ])
  return { provinces, locality }
}

export function saveLocality(id: number | undefined, values: LocalityInput) {
  return id !== undefined ? localityService.update(id, values) : localityService.create(values)
}