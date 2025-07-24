import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { atualizarPericia } from '@renderer/api/pericia-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

type atualizarPericiaMutation = {
  id: number
  pericia: IPericia
}

export const useAtualizarPericia = (): UseMutationResult<
  void,
  Error,
  atualizarPericiaMutation,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, pericia }) => atualizarPericia(id, pericia),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
