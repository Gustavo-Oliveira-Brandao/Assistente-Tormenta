import { Pericia } from '@renderer/@types/t20/Pericia'
import { atualizarPericia } from '@renderer/api/pericia/atualizarPericia'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarPericiaMutation = (): UseMutationResult<void, Error, Pericia, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (pericia: Pericia) => atualizarPericia(pericia),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
