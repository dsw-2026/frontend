export const adopterKeys = {
  all: ['adopters'] as const,
  detail: (id: number) => ['adopters', id] as const,
}