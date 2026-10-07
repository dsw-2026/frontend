import { speciesService } from '../../../../services/species.service'
import type { SpeciesInput } from '../../../../models/species'

export function loadSpecies(id: number) {
  return speciesService.getById(id)
}

export function saveSpecies(id: number | undefined, values: SpeciesInput) {
  return id !== undefined ? speciesService.update(id, values) : speciesService.create(values)
}