import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { adopterService } from './adopter.service'
import { adopterKeys } from './adopter.keys'
import type { AdopterInput } from './adopter.model'

export function useAdopterList() {
  return useQuery({ queryKey: adopterKeys.all, queryFn: adopterService.getAll })
}

export function useAdopter(id: number | undefined) {
  return useQuery({
    queryKey: adopterKeys.detail(Number(id)),
    queryFn: () => adopterService.getById(Number(id)),
    enabled: Boolean(id),
  })
}

export function useSaveAdopter(id?: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: AdopterInput) =>
      id ? adopterService.update(id, values) : adopterService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adopterKeys.all })
      toast.success(id ? 'Adoptante actualizado con éxito' : 'Adoptante registrado con éxito')
    },
    onError: () => {
      toast.error('Ocurrió un error al guardar los datos del adoptante')
    },
  })
}

export function useDeleteAdopter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adopterService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adopterKeys.all })
      toast.success('Adoptante eliminado correctamente')
    },
    onError: () => {
      toast.error('No se pudo eliminar el adoptante')
    },
  })
}