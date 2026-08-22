// Refleja provincia.entity.ts del backend.
export interface Provincia {
  id: number
  nombre: string
  codigo: string
}

// Lo que se envía al crear o editar: sin id (lo asigna el backend).
export type ProvinciaInput = Pick<Provincia, 'nombre' | 'codigo'>
