import { petService } from '../../../../services/pet.service'

export function loadPet(id: number) {
  return petService.getById(id)
}