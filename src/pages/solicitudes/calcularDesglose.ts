import type { Solicitud } from '../../models/solicitud'

export interface FactorCompatibilidad {
  factor: string
  detalleMascota: string
  detalleAdoptante: string
  puntos: number
  compatible: boolean
}

const TOLERANCIA_TEXTO: Record<string, string> = { SI: 'Sí', NO: 'No', DESCONOCIDO: 'Desconocido' }
const TAMANIO_TEXTO: Record<string, string> = {
  PEQUENIO: 'Pequeño',
  MEDIANO: 'Mediano',
  GRANDE: 'Grande',
  GIGANTE: 'Gigante',
}
const ENERGIA_TEXTO: Record<string, string> = { BAJA: 'Baja', MEDIA: 'Media', ALTA: 'Alta' }

// Compara, campo por campo, las preferencias que declaró el Adoptante en
// ESTA solicitud contra la Caracteristica real de la Mascota. Regla
// simple, a propósito (decisión del equipo): coincide = 1 punto, no
// coincide = 0 puntos. Nada de esto se persiste — se recalcula cada vez
// que se abre esta pantalla, con los datos actuales de la Mascota (los
// atributos del Adoptante NO entran en esta comparación).
export function calcularDesglose(solicitud: Solicitud): FactorCompatibilidad[] {
  const { caracteristica } = solicitud.mascota

  return [
    {
      factor: 'Nivel de energía',
      detalleMascota: `Energía: ${ENERGIA_TEXTO[caracteristica.energia]}`,
      detalleAdoptante: `Busca: ${ENERGIA_TEXTO[solicitud.energiaDeseada]}`,
      puntos: solicitud.energiaDeseada === caracteristica.energia ? 1 : 0,
      compatible: solicitud.energiaDeseada === caracteristica.energia,
    },
    {
      factor: 'Tamaño',
      detalleMascota: `Tamaño: ${TAMANIO_TEXTO[caracteristica.tamanio]}`,
      detalleAdoptante: `Busca: ${TAMANIO_TEXTO[solicitud.tamanioDeseado]}`,
      puntos: solicitud.tamanioDeseado === caracteristica.tamanio ? 1 : 0,
      compatible: solicitud.tamanioDeseado === caracteristica.tamanio,
    },
    {
      factor: 'Tolerancia a niños',
      detalleMascota: `Tolera niños: ${TOLERANCIA_TEXTO[caracteristica.toleraNinos]}`,
      detalleAdoptante: `Busca: ${TOLERANCIA_TEXTO[solicitud.toleraNinosDeseado]}`,
      puntos: solicitud.toleraNinosDeseado === caracteristica.toleraNinos ? 1 : 0,
      compatible: solicitud.toleraNinosDeseado === caracteristica.toleraNinos,
    },
    {
      factor: 'Tolerancia a otros animales',
      detalleMascota: `Tolera otros animales: ${TOLERANCIA_TEXTO[caracteristica.toleraAnimales]}`,
      detalleAdoptante: `Busca: ${TOLERANCIA_TEXTO[solicitud.toleraAnimalesDeseado]}`,
      puntos: solicitud.toleraAnimalesDeseado === caracteristica.toleraAnimales ? 1 : 0,
      compatible: solicitud.toleraAnimalesDeseado === caracteristica.toleraAnimales,
    },
    {
      factor: 'Tolerancia al encierro',
      detalleMascota: `Tolera el encierro: ${TOLERANCIA_TEXTO[caracteristica.toleraEncierro]}`,
      detalleAdoptante: `Busca: ${TOLERANCIA_TEXTO[solicitud.toleraEncierroDeseado]}`,
      puntos: solicitud.toleraEncierroDeseado === caracteristica.toleraEncierro ? 1 : 0,
      compatible: solicitud.toleraEncierroDeseado === caracteristica.toleraEncierro,
    },
  ]
}
