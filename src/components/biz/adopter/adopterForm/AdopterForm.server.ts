import { adopterService } from '../../../../services/adopter.service'
import { localityService } from '../../../../services/locality.service'
import type { AdopterInput } from '../../../../models/adopter'

export async function loadAdopterFormData(id?: number) {
  const [localities, adopter] = await Promise.all([
    localityService.getAll(),
    id !== undefined ? adopterService.getById(id) : Promise.resolve(null),
  ])
  return { localities, adopter }
}

export function saveAdopter(id: number | undefined, values: AdopterInput) {
  return id !== undefined ? adopterService.update(id, values) : adopterService.create(values)
}