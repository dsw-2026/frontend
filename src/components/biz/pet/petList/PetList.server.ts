import { petService } from '../../../../services/pet.service'

export function loadPets(publisherId?: number) {
  return petService.getAll(undefined, publisherId)
}

export function deletePet(id: number) {
  return petService.remove(id)
}