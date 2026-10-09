import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { petService } from './pet.service'
import { petKeys } from './pet.keys'
import type { PetInput } from './pet.model'

export function usePetList(filters: { status?: string; publisher?: number } = {}) {
  return useQuery({
    queryKey: petKeys.list(filters),
    queryFn: () => petService.getAll(filters.status, filters.publisher),
  })
}

export function usePet(id: number | undefined) {
  return useQuery({
    queryKey: petKeys.detail(Number(id)),
    queryFn: () => petService.getById(Number(id)),
    enabled: Boolean(id),
  })
}

export function useSavePet(id?: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: PetInput) =>
      id ? petService.update(id, values) : petService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petKeys.all })
      toast.success(id ? 'Mascota actualizada con éxito' : 'Mascota creada con éxito')
    },
    onError: () => {
      toast.error('Ocurrió un error al guardar la mascota')
    },
  })
}

export function useDeletePet() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => petService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petKeys.all })
      toast.success('Mascota eliminada correctamente')
    },
    onError: () => {
      toast.error('No se pudo eliminar la mascota')
    },
  })
}