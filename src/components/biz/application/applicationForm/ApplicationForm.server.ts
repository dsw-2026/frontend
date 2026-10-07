import { applicationService } from '../../../../services/application.service'
import { petService } from '../../../../services/pet.service'
import { PetStatus } from '../../../../models/pet'
import type { ApplicationInput } from '../../../../models/application'


export async function loadApplicationFormData(petId?: number) {
  if (petId !== undefined) {
    return { fixedPet: await petService.getById(petId), availablePets: [] }
  }
  return { fixedPet: null, availablePets: await petService.getAll(PetStatus.AVAILABLE) }
}

export function createApplication(values: ApplicationInput) {
  return applicationService.create(values)
}