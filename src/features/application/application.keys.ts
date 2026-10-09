export const applicationKeys = {
  all: ['applications'] as const,
  list: (status?: string) => ['applications', { status }] as const,
  detail: (id: number) => ['applications', id] as const,
}