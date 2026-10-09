export const petKeys = {
  all: ['pets'] as const,
  list: (filters: { status?: string; publisher?: number }) => ['pets', filters] as const,
  detail: (id: number) => ['pets', id] as const,
}