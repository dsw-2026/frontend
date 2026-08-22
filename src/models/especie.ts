// Refleja especie.entity.ts del backend.
export interface Especie {
  id: number
  nombre: string
}

// Lo que se envía al crear o editar: sin id (lo asigna el backend).
export type EspecieInput = Pick<Especie, 'nombre'>
