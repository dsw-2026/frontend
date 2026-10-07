import { speciesService } from '../../../../services/species.service'

export function loadAllSpecies() {
  return speciesService.getAll()
}

export function deleteSpecies(id: number) {
  return speciesService.remove(id)
}