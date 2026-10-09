// Claves de React Query centralizadas, para invalidar sin errores de tipeo.
export const speciesKeys = {
  all: ['species'] as const,
  detail: (id: number) => ['species', id] as const,
}