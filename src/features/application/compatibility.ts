import type { Application } from './application.model'

export interface CompatibilityFactor {
  factor: string
  petDetail: string
  adopterDetail: string
  points: number
  compatible: boolean
}

const TOLERANCE_TEXT: Record<string, string> = { YES: 'Sí', NO: 'No', UNKNOWN: 'Desconocido' }
const SIZE_TEXT: Record<string, string> = { SMALL: 'Pequeño', MEDIUM: 'Mediano', LARGE: 'Grande', GIANT: 'Gigante' }
const ENERGY_TEXT: Record<string, string> = { LOW: 'Baja', MEDIUM: 'Media', HIGH: 'Alta' }

export function calculateBreakdown(application: Application): CompatibilityFactor[] {
  const { characteristic } = application.pet
  return [
    {
      factor: 'Nivel de energía',
      petDetail: `Energía: ${ENERGY_TEXT[characteristic.energyLevel]}`,
      adopterDetail: `Busca: ${ENERGY_TEXT[application.desiredEnergyLevel]}`,
      points: application.desiredEnergyLevel === characteristic.energyLevel ? 1 : 0,
      compatible: application.desiredEnergyLevel === characteristic.energyLevel,
    },
    {
      factor: 'Tamaño',
      petDetail: `Tamaño: ${SIZE_TEXT[characteristic.size]}`,
      adopterDetail: `Busca: ${SIZE_TEXT[application.desiredSize]}`,
      points: application.desiredSize === characteristic.size ? 1 : 0,
      compatible: application.desiredSize === characteristic.size,
    },
    {
      factor: 'Tolerancia a niños',
      petDetail: `Tolera niños: ${TOLERANCE_TEXT[characteristic.toleratesChildren]}`,
      adopterDetail: `Busca: ${TOLERANCE_TEXT[application.desiredToleratesChildren]}`,
      points: application.desiredToleratesChildren === characteristic.toleratesChildren ? 1 : 0,
      compatible: application.desiredToleratesChildren === characteristic.toleratesChildren,
    },
    {
      factor: 'Tolerancia a otros animales',
      petDetail: `Tolera otros animales: ${TOLERANCE_TEXT[characteristic.toleratesOtherAnimals]}`,
      adopterDetail: `Busca: ${TOLERANCE_TEXT[application.desiredToleratesOtherAnimals]}`,
      points: application.desiredToleratesOtherAnimals === characteristic.toleratesOtherAnimals ? 1 : 0,
      compatible: application.desiredToleratesOtherAnimals === characteristic.toleratesOtherAnimals,
    },
    {
      factor: 'Tolerancia al encierro',
      petDetail: `Tolera el encierro: ${TOLERANCE_TEXT[characteristic.toleratesConfinement]}`,
      adopterDetail: `Busca: ${TOLERANCE_TEXT[application.desiredToleratesConfinement]}`,
      points: application.desiredToleratesConfinement === characteristic.toleratesConfinement ? 1 : 0,
      compatible: application.desiredToleratesConfinement === characteristic.toleratesConfinement,
    },
  ]
}

export function totalCompatibility(breakdown: CompatibilityFactor[]) {
  const points = breakdown.reduce((sum, f) => sum + f.points, 0)
  const total = breakdown.length
  const percentage = total > 0 ? Math.round((points / total) * 100) : 0
  return { points, total, percentage }
}