import type { FactorCompatibilidad } from './calcularDesglose'

// Suma los puntos del desglose (1 por cada campo que coincide, de 5
// posibles) y calcula el porcentaje equivalente. A diferencia de la
// versión anterior, acá no hace falta normalizar contra un mínimo/máximo
// teórico: el puntaje ya va de 0 a la cantidad total de factores, así que
// el porcentaje sale directo de esa proporción.
export function totalCompatibilidad(desglose: FactorCompatibilidad[]): {
  puntos: number
  total: number
  porcentaje: number
} {
  const puntos = desglose.reduce((suma, factor) => suma + factor.puntos, 0)
  const total = desglose.length
  const porcentaje = total > 0 ? Math.round((puntos / total) * 100) : 0
  return { puntos, total, porcentaje }
}
