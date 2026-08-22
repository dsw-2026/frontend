import type { Especie } from './especie'
import type { Publicador } from './publicador'

export const Sexo = { MACHO: 'MACHO', HEMBRA: 'HEMBRA' } as const
export type Sexo = (typeof Sexo)[keyof typeof Sexo]

export const UnidadEdad = { MESES: 'MESES', ANIOS: 'ANIOS' } as const
export type UnidadEdad = (typeof UnidadEdad)[keyof typeof UnidadEdad]

export const EstadoMascota = {
  DISPONIBLE: 'DISPONIBLE',
  EN_PROCESO: 'EN_PROCESO',
  ADOPTADA: 'ADOPTADA',
  NO_DISPONIBLE: 'NO_DISPONIBLE',
} as const
export type EstadoMascota = (typeof EstadoMascota)[keyof typeof EstadoMascota]

export const Tamanio = {
  PEQUENIO: 'PEQUENIO',
  MEDIANO: 'MEDIANO',
  GRANDE: 'GRANDE',
  GIGANTE: 'GIGANTE',
} as const
export type Tamanio = (typeof Tamanio)[keyof typeof Tamanio]

export const Energia = { BAJA: 'BAJA', MEDIA: 'MEDIA', ALTA: 'ALTA' } as const
export type Energia = (typeof Energia)[keyof typeof Energia]

export const Tolerancia = { SI: 'SI', NO: 'NO', DESCONOCIDO: 'DESCONOCIDO' } as const
export type Tolerancia = (typeof Tolerancia)[keyof typeof Tolerancia]

// Refleja caracteristica.entity.ts. No tiene service propio: siempre se
// crea/edita junto con su Mascota (ver mascota.controller.ts, cascade: ALL).
export interface Caracteristica {
  id: number
  energia: Energia
  caracter: string
  tamanio: Tamanio
  vacunacion: boolean
  castracion: boolean
  toleraNinos: Tolerancia
  toleraAnimales: Tolerancia
  toleraEncierro: Tolerancia
  observacionesAdicionales?: string
}

// Refleja mascota.entity.ts. especie/publicador/caracteristica vienen
// poblados (populate: ['especie', 'publicador', 'caracteristica'] en el
// controller).
export interface Mascota {
  id: number
  nombre: string
  sexo: Sexo
  edad: number
  unidadEdad: UnidadEdad
  estado: EstadoMascota
  fechaIngreso: string
  foto?: string
  especie: Especie
  publicador: Publicador
  caracteristica: Caracteristica
}

// OJO: este objeto va PLANO en el body del POST/PUT — los campos de
// Caracteristica (energia, caracter, tamanio...) NO van anidados dentro
// de una clave "caracteristica". El backend los separa recién en
// sanitizeMascotaInput, leyendo req.body.energia directo del nivel
// superior. Si se manda anidado, el backend los ignora en silencio.
export interface MascotaInput {
  nombre: string
  sexo: Sexo
  edad: number
  unidadEdad: UnidadEdad
  estado: EstadoMascota
  foto?: string
  especie: number
  publicador: number
  energia: Energia
  caracter: string
  tamanio: Tamanio
  vacunacion: boolean
  castracion: boolean
  toleraNinos: Tolerancia
  toleraAnimales: Tolerancia
  toleraEncierro: Tolerancia
  observacionesAdicionales?: string
}
