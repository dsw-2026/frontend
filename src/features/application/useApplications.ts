import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { applicationService } from './application.service'
import { applicationKeys } from './application.keys'
import type { ApplicationInput } from './application.model'

export function useApplicationList(status?: string) {
  return useQuery({
    queryKey: applicationKeys.list(status),
    queryFn: () => applicationService.getAll(status),
  })
}

export function useApplication(id: number | undefined) {
  return useQuery({
    queryKey: applicationKeys.detail(Number(id)),
    queryFn: () => applicationService.getById(Number(id)),
    enabled: Boolean(id),
  })
}

export function useCreateApplication() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: ApplicationInput) => applicationService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all })
      toast.success('Solicitud enviada con éxito')
    },
    onError: () => {
      toast.error('No se pudo enviar la solicitud')
    },
  })
}

export function useApproveApplication() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => applicationService.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all })
      toast.success('Solicitud aprobada con éxito')
    },
    onError: () => {
      toast.error('Error al aprobar la solicitud')
    },
  })
}

export function useRejectApplication() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => applicationService.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all })
      toast.success('Solicitud rechazada correctamente')
    },
    onError: () => {
      toast.error('Error al rechazar la solicitud')
    },
  })
}

export function useDeleteApplication() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => applicationService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all })
      toast.success('Solicitud eliminada con éxito')
    },
    onError: () => {
      toast.error('No se pudo eliminar la solicitud')
    },
  })
}