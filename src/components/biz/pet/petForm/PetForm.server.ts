import { petService } from '../../../../services/pet.service'
import { speciesService } from '../../../../services/species.service'
import type { PetInput } from '../../../../models/pet'

export async function loadPetFormData(id?: number) {
  const [speciesList, pet] = await Promise.all([
    speciesService.getAll(),
    id !== undefined ? petService.getById(id) : Promise.resolve(null),
  ])
  return { speciesList, pet }
}

export function savePet(id: number | undefined, values: PetInput) {
  return id !== undefined ? petService.update(id, values) : petService.create(values)
}