import type { Application } from '../../../../models/application'
import { ENERGY_LEVEL_LABELS, SIZE_LABELS, TOLERANCE_LABELS } from '../../pet/petForm/PetForm.data'

export interface CompatibilityFactor {
  factor: string
  petDetail: string
  adopterDetail: string
  points: number
  compatible: boolean
}

// Compara, campo por campo, las preferencias que declaró el Adopter en
// ESTA solicitud contra la Characteristic real de la Pet. Regla simple, a
// propósito (decisión del equipo): coincide = 1 punto, no coincide = 0.
// Nada de esto se persiste — se recalcula cada vez que se abre la pantalla,
// con los datos actuales de la Pet (los atributos del Adopter NO entran en
// esta comparación).
export function calculateBreakdown(application: Application): CompatibilityFactor[] {
  const { characteristic } = application.pet

  return [
    {
      factor: 'Nivel de energía',
      petDetail: `Energía: ${ENERGY_LEVEL_LABELS[characteristic.energyLevel]}`,
      adopterDetail: `Busca: ${ENERGY_LEVEL_LABELS[application.desiredEnergyLevel]}`,
      points: application.desiredEnergyLevel === characteristic.energyLevel ? 1 : 0,
      compatible: application.desiredEnergyLevel === characteristic.energyLevel,
    },
    {
      factor: 'Tamaño',
      petDetail: `Tamaño: ${SIZE_LABELS[characteristic.size]}`,
      adopterDetail: `Busca: ${SIZE_LABELS[application.desiredSize]}`,
      points: application.desiredSize === characteristic.size ? 1 : 0,
      compatible: application.desiredSize === characteristic.size,
    },
    {
      factor: 'Tolerancia a niños',
      petDetail: `Tolera niños: ${TOLERANCE_LABELS[characteristic.toleratesChildren]}`,
      adopterDetail: `Busca: ${TOLERANCE_LABELS[application.desiredToleratesChildren]}`,
      points: application.desiredToleratesChildren === characteristic.toleratesChildren ? 1 : 0,
      compatible: application.desiredToleratesChildren === characteristic.toleratesChildren,
    },
    {
      factor: 'Tolerancia a otros animales',
      petDetail: `Tolera otros animales: ${TOLERANCE_LABELS[characteristic.toleratesOtherAnimals]}`,
      adopterDetail: `Busca: ${TOLERANCE_LABELS[application.desiredToleratesOtherAnimals]}`,
      points: application.desiredToleratesOtherAnimals === characteristic.toleratesOtherAnimals ? 1 : 0,
      compatible: application.desiredToleratesOtherAnimals === characteristic.toleratesOtherAnimals,
    },
    {
      factor: 'Tolerancia al encierro',
      petDetail: `Tolera el encierro: ${TOLERANCE_LABELS[characteristic.toleratesConfinement]}`,
      adopterDetail: `Busca: ${TOLERANCE_LABELS[application.desiredToleratesConfinement]}`,
      points: application.desiredToleratesConfinement === characteristic.toleratesConfinement ? 1 : 0,
      compatible: application.desiredToleratesConfinement === characteristic.toleratesConfinement,
    },
  ]
}

// Suma los puntos del desglose (1 por cada campo que coincide) y calcula el
// porcentaje equivalente. No hace falta normalizar: el puntaje ya va de 0 a
// la cantidad total de factores.
export function totalCompatibility(breakdown: CompatibilityFactor[]): {
  points: number
  total: number
  percentage: number
} {
  const points = breakdown.reduce((sum, factor) => sum + factor.points, 0)
  const total = breakdown.length
  const percentage = total > 0 ? Math.round((points / total) * 100) : 0
  return { points, total, percentage }
}