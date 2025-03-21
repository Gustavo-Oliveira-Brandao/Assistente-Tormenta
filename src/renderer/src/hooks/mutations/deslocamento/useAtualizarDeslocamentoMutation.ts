import { IDeslocamento } from '@renderer/@types/t20/Deslocamento'
import { atualizarDeslocamento } from '@renderer/api/deslocamento/atualizarDeslocamento'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarDeslocamentoMutation = (): UseMutationResult<
  void,
  Error,
  IDeslocamento,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (deslocamento: IDeslocamento) => atualizarDeslocamento(deslocamento),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
