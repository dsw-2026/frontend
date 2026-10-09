export interface Province {
  id: number
  name: string
  code: string
}

export type ProvinceInput = Pick<Province, 'name' | 'code'>