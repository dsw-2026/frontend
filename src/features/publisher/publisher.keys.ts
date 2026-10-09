export const publisherKeys = {
  all: ['publishers'] as const,
  detail: (id: number) => ['publishers', id] as const,
}