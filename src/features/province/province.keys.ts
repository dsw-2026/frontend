export const provinceKeys = {
  all: ['provinces'] as const,
  detail: (id: number) => ['provinces', id] as const,
}