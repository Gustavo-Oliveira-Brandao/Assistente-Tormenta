import { Deslocamento } from '@renderer/@types/t20/Deslocamento'
import { atualizarDeslocamento } from '@renderer/api/deslocamento/atualizarDeslocamento'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarDeslocamentoMutation = (): UseMutationResult<
  void,
  Error,
  Deslocamento,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (deslocamento: Deslocamento) => atualizarDeslocamento(deslocamento),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
