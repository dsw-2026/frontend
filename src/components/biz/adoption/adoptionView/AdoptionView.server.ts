import { petService } from '../../../../services/pet.service'
import { speciesService } from '../../../../services/species.service'
import { PetStatus } from '../../../../models/pet'

export function loadAvailablePets(speciesId?: number) {
  return petService.getAll(PetStatus.AVAILABLE, undefined, speciesId)
}

export function loadSpecies() {
  return speciesService.getAll()
}