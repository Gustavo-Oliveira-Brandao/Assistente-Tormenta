import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { atualizarPericia } from '@renderer/api/pericia-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarPericia = (): UseMutationResult<void, Error, IPericia, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (pericia) => atualizarPericia(pericia),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
