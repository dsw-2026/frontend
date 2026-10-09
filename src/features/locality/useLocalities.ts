import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { localityService } from './locality.service'
import { localityKeys } from './locality.keys'
import type { LocalityInput } from './locality.model'

export function useLocalityList() {
  return useQuery({
    queryKey: localityKeys.all,
    queryFn: localityService.getAll,
  })
}

export function useLocality(id: number | undefined) {
  return useQuery({
    queryKey: localityKeys.detail(Number(id)),
    queryFn: () => localityService.getById(Number(id)),
    enabled: Boolean(id),
  })
}

export function useSaveLocality(id?: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: LocalityInput) =>
      id ? localityService.update(id, values) : localityService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: localityKeys.all })
    },
  })
}

export function useDeleteLocality() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => localityService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: localityKeys.all })
    },
  })
}