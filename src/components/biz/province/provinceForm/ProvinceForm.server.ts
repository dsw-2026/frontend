import { provinceService } from '../../../../services/province.service'
import type { ProvinceInput } from '../../../../models/province'

export function loadProvince(id: number) {
  return provinceService.getById(id)
}

export function saveProvince(id: number | undefined, values: ProvinceInput) {
  return id !== undefined ? provinceService.update(id, values) : provinceService.create(values)
}