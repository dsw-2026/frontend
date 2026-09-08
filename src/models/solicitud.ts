import type { Mascota, Energia, Tamanio, Tolerancia } from './mascota'
import type { Adoptante } from './adoptante'

export const EstadoSolicitud = {
  PENDIENTE: 'PENDIENTE',
  APROBADA: 'APROBADA',
  RECHAZADA: 'RECHAZADA',
} as const
export type EstadoSolicitud = (typeof EstadoSolicitud)[keyof typeof EstadoSolicitud]

// Refleja solicitud.entity.ts. mascota (con su especie y caracteristica)
// y adoptante vienen poblados (ver POPULATE en solicitud.controller.ts).
export interface Solicitud {
  id: number
  estado: EstadoSolicitud
  fechaSolicitud: string
  mensaje?: string
  // Preferencias declaradas por el Adoptante en ESTA solicitud puntual.
  // Se comparan contra Caracteristica al vuelo (ver calcularDesglose) —
  // no hay ningún puntaje persistido, decisión del equipo para no tener
  // un número que pueda desactualizarse.
  energiaDeseada: Energia
  tamanioDeseado: Tamanio
  toleraNinosDeseado: Tolerancia
  toleraAnimalesDeseado: Tolerancia
  toleraEncierroDeseado: Tolerancia
  mascota: Mascota
  adoptante: Adoptante
}

// Lo que se envía al crear una Solicitud (Epic A). El adoptante NO va acá:
// lo toma el backend del token de la sesión, para que nadie pueda crear una
// solicitud a nombre de otro. No existe un "update" genérico: el único
// cambio de estado posible es aprobar/rechazar (Epic B), que son endpoints
// propios - no un PUT/PATCH con el estado en el body.
export interface SolicitudInput {
  mensaje?: string
  mascota: number
  energiaDeseada: Energia
  tamanioDeseado: Tamanio
  toleraNinosDeseado: Tolerancia
  toleraAnimalesDeseado: Tolerancia
  toleraEncierroDeseado: Tolerancia
}
