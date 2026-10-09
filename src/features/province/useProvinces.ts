import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { provinceService } from './province.service'
import { provinceKeys } from './province.keys'
import type { ProvinceInput } from './province.model'

export function useProvinceList() {
  return useQuery({
    queryKey: provinceKeys.all,
    queryFn: provinceService.getAll,
  })
}

export function useProvince(id: number | undefined) {
  return useQuery({
    queryKey: provinceKeys.detail(Number(id)),
    queryFn: () => provinceService.getById(Number(id)),
    enabled: Boolean(id),
  })
}

export function useSaveProvince(id?: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: ProvinceInput) =>
      id ? provinceService.update(id, values) : provinceService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: provinceKeys.all })
      toast.success(id ? 'Provincia actualizada con éxito' : 'Provincia creada con éxito')
    },
    onError: () => {
      toast.error('Ocurrió un error al guardar la provincia')
    },
  })
}

export function useDeleteProvince() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => provinceService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: provinceKeys.all })
      toast.success('Provincia eliminada correctamente')
    },
    onError: () => {
      toast.error('No se pudo eliminar la provincia')
    },
  })
}