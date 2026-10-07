import type { Pet, Sex, AgeUnit, PetStatus, Size, EnergyLevel, Tolerance } from '../../../../models/pet'

export interface PetFormValues {
  name: string
  sex: Sex
  age: number
  ageUnit: AgeUnit
  status: PetStatus
  photo: string
  speciesId: number | ''
  energyLevel: EnergyLevel
  temperament: string
  size: Size
  vaccinated: boolean
  neutered: boolean
  toleratesChildren: Tolerance
  toleratesOtherAnimals: Tolerance
  toleratesConfinement: Tolerance
  additionalNotes: string
}

// Un registro por valor de enum, mostrado en español en los <select>. El
// backend guarda el valor en mayúsculas (ej: "SMALL"); esto es solo la
// etiqueta visual.
export const SEX_LABELS: Record<Sex, string> = { MALE: 'Macho', FEMALE: 'Hembra' }

export const AGE_UNIT_LABELS: Record<AgeUnit, string> = { MONTHS: 'Meses', YEARS: 'Años' }

export const STATUS_LABELS: Record<PetStatus, string> = {
  AVAILABLE: 'Disponible',
  IN_PROCESS: 'En proceso',
  ADOPTED: 'Adoptada',
  UNAVAILABLE: 'No disponible',
}

export const SIZE_LABELS: Record<Size, string> = {
  SMALL: 'Pequeño',
  MEDIUM: 'Mediano',
  LARGE: 'Grande',
  GIANT: 'Gigante',
}

export const ENERGY_LEVEL_LABELS: Record<EnergyLevel, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
}

export const TOLERANCE_LABELS: Record<Tolerance, string> = {
  YES: 'Sí',
  NO: 'No',
  UNKNOWN: 'Desconocido',
}

export function petToFormValues(pet: Pet): PetFormValues {
  return {
    name: pet.name,
    sex: pet.sex,
    age: pet.age,
    ageUnit: pet.ageUnit,
    status: pet.status,
    photo: pet.photo ?? '',
    speciesId: pet.species.id,
    energyLevel: pet.characteristic.energyLevel,
    temperament: pet.characteristic.temperament,
    size: pet.characteristic.size,
    vaccinated: pet.characteristic.vaccinated,
    neutered: pet.characteristic.neutered,
    toleratesChildren: pet.characteristic.toleratesChildren,
    toleratesOtherAnimals: pet.characteristic.toleratesOtherAnimals,
    toleratesConfinement: pet.characteristic.toleratesConfinement,
    additionalNotes: pet.characteristic.additionalNotes ?? '',
  }
}