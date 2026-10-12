import type { PetFilters } from './pet.model'

export const petKeys = {
  all: ['pets'] as const,
  list: (filters: PetFilters) => ['pets', 'list', filters] as const,
  detail: (id: number) => ['pets', 'detail', id] as const,
}