import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { publisherService } from './publisher.service'
import { publisherKeys } from './publisher.keys'
import type { PublisherInput } from './publisher.model'

export function usePublisherList() {
  return useQuery({
    queryKey: publisherKeys.all,
    queryFn: publisherService.getAll,
  })
}

export function usePublisher(id: number | undefined) {
  return useQuery({
    queryKey: publisherKeys.detail(Number(id)),
    queryFn: () => publisherService.getById(Number(id)),
    enabled: Boolean(id),
  })
}

export function useSavePublisher(id?: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: PublisherInput) =>
      id ? publisherService.update(id, values) : publisherService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: publisherKeys.all })
      toast.success(id ? 'Publicador actualizado con éxito' : 'Publicador registrado con éxito')
    },
    onError: () => {
      toast.error('Ocurrió un error al guardar los datos del publicador')
    },
  })
}

export function useDeletePublisher() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => publisherService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: publisherKeys.all })
      toast.success('Publicador eliminado correctamente')
    },
    onError: () => {
      toast.error('No se pudo eliminar el publicador')
    },
  })
}