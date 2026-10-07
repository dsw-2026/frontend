import { petService } from '../../../../services/pet.service'
import { PetStatus } from '../../../../models/pet'

export function loadAvailablePets() {
  return petService.getAll(PetStatus.AVAILABLE)
}