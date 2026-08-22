import type { Localidad } from './localidad'

// Refleja adoptante.entity.ts (TipoVivienda es el enum del backend).
export const TipoVivienda = {
  CASA: 'CASA',
  DEPARTAMENTO: 'DEPARTAMENTO',
  OTRO: 'OTRO',
} as const
export type TipoVivienda = (typeof TipoVivienda)[keyof typeof TipoVivienda]

// Lo que devuelve el backend. "contrasena" nunca viene (hidden: true en
// la entidad Usuario).
export interface Adoptante {
  id: number
  nombreUsuario: string
  nombre: string
  apellido: string
  email: string
  telefono?: string
  descripcion?: string
  direccion?: string
  fotoPerfil?: string
  verificacion: boolean
  localidad?: Localidad
  occupation?: string
  tipoVivienda?: TipoVivienda
}

// Lo que se envía al crear o editar. "contrasena" opcional por el mismo
// motivo que en Publicador: obligatoria al crear, opcional al editar.
// "verificacion": ver el mismo comentario/TODO que en publicador.ts —
// temporal hasta que exista control por rol.
export interface AdoptanteInput {
  nombreUsuario: string
  nombre: string
  apellido: string
  contrasena?: string
  email: string
  telefono?: string
  descripcion?: string
  direccion?: string
  fotoPerfil?: string
  localidad?: number
  verificacion?: boolean
  occupation?: string
  tipoVivienda?: TipoVivienda
}
