import { provinceService } from '../../../../services/province.service'

export function loadAllProvinces() {
  return provinceService.getAll()
}

export function deleteProvince(id: number) {
  return provinceService.remove(id)
}