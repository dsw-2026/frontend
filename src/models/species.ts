export interface Species {
  id: number
  name: string
}

export type SpeciesInput = Pick<Species, 'name'>