// "instagram: https://..." (una por línea) → { instagram: "https://..." }.
// Líneas sin ":" o vacías se ignoran en vez de romper el guardado.
export function parseRedesSociales(texto: string): Record<string, string> | undefined {
  const entradas = texto
    .split('\n')
    .map((linea) => linea.trim())
    .filter(Boolean)
    .map((linea) => {
      const [clave, ...resto] = linea.split(':')
      return [clave.trim(), resto.join(':').trim()] as const
    })
    .filter(([clave, valor]) => clave && valor)

  return entradas.length > 0 ? Object.fromEntries(entradas) : undefined
}

// { instagram: "https://..." } → "instagram: https://..." (para mostrar
// en el textarea al editar un Publicador que ya tiene redes cargadas).
export function formatRedesSociales(redes?: Record<string, string>): string {
  if (!redes) return ''
  return Object.entries(redes)
    .map(([clave, valor]) => `${clave}: ${valor}`)
    .join('\n')
}
