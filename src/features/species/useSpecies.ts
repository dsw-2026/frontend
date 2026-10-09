import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { speciesService } from './species.service'
import { speciesKeys } from './species.keys'
import type { SpeciesInput } from './species.model'

export function useSpeciesList() {
  return useQuery({
    queryKey: speciesKeys.all,
    queryFn: speciesService.getAll,
  })
}

export function useSpecies(id: number | undefined) {
  return useQuery({
    queryKey: speciesKeys.detail(Number(id)),
    queryFn: () => speciesService.getById(Number(id)),
    enabled: Boolean(id),
  })
}

export function useSaveSpecies(id?: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: SpeciesInput) =>
      id ? speciesService.update(id, values) : speciesService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: speciesKeys.all })
      toast.success(id ? 'Especie actualizada con éxito' : 'Especie creada con éxito')
    },
    onError: () => {
      toast.error('Ocurrió un error al guardar la especie')
    },
  })
}

export function useDeleteSpecies() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => speciesService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: speciesKeys.all })
      toast.success('Especie eliminada correctamente')
    },
    onError: () => {
      toast.error('No se pudo eliminar la especie')
    },
  })
}