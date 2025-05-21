import { IDeslocamento } from '@renderer/@types/T20 GOTY/IDeslocamento'
import { atualizarDeslocamento } from '@renderer/api/deslocamento-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarDeslocamento = (): UseMutationResult<
  void,
  Error,
  IDeslocamento,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (deslocamento) => atualizarDeslocamento(deslocamento),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
