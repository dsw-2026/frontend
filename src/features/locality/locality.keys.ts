export const localityKeys = {
  all: ['localities'] as const,
  detail: (id: number) => ['localities', id] as const,
}