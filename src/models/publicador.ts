import type { Localidad } from './localidad'

// Refleja el enum TipoPublicador de publicador.entity.ts en el backend.
export const TipoPublicador = {
  REFUGIO: 'REFUGIO',
  RESCATISTA_INDEPENDIENTE: 'RESCATISTA_INDEPENDIENTE',
  HOGAR_DE_TRANSITO: 'HOGAR_DE_TRANSITO',
} as const
export type TipoPublicador = (typeof TipoPublicador)[keyof typeof TipoPublicador]

// Combina los campos heredados de Usuario con los propios de Publicador.
// "contrasena" NO aparece acá: la entidad la marca @Property({ hidden: true })
// en el backend, así que MikroORM nunca la incluye en las respuestas.
export interface Publicador {
  id: number
  nombreUsuario: string
  nombre: string
  apellido: string
  email: string
  telefono?: string
  descripcion?: string
  direccion?: string
  fotoPerfil?: string
  localidad?: Localidad
  verificacion: boolean
  tipo?: TipoPublicador
  sitioWeb?: string
  redesSociales?: Record<string, string>
  horariosAtencion?: string
}

// Lo que se envía al crear o editar. "contrasena" es opcional: obligatoria
// al crear, pero al editar puede omitirse para conservar la actual (así
// lo maneja publicador.controller.ts en el backend). "localidad" va como
// id, no como objeto completo.
export interface PublicadorInput {
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
  // Solo tiene efecto al editar: el backend siempre fuerza false al crear
  // (ver create() en publicador.controller.ts) — una cuenta nueva no
  // puede autoverificarse. Se incluye igual acá porque, temporalmente y
  // hasta que exista auth, cualquiera puede editarla (ver TODO en el
  // backend); una vez que haya roles, este campo se saca de acá.
  verificacion?: boolean
  tipo?: TipoPublicador
  sitioWeb?: string
  redesSociales?: Record<string, string>
  horariosAtencion?: string
}
