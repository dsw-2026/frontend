import type { Provincia } from './provincia'

// Refleja localidad.entity.ts del backend. El controller siempre hace
// populate(['provincia']), así que las respuestas traen la Provincia
// completa, no solo su id.
export interface Localidad {
  id: number
  nombre: string
  codigoPostal: string
  provincia: Provincia
}

// Lo que se envía al crear o editar: la provincia va como id (número),
// no como objeto completo — así espera recibirla sanitizeLocalidadInput
// en el backend.
export interface LocalidadInput {
  nombre: string
  codigoPostal: string
  provincia: number
}
