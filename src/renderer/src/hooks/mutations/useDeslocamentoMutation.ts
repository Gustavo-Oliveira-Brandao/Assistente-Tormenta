import { IDeslocamento } from '@renderer/@types/T20 GOTY/IDeslocamento'
import { atualizarDeslocamento } from '@renderer/api/deslocamento-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

type atualizarDeslocamentoMutation = {
  id: number
  deslocamento: IDeslocamento
}

export const useAtualizarDeslocamento = (): UseMutationResult<
  void,
  Error,
  atualizarDeslocamentoMutation,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, deslocamento }) => atualizarDeslocamento(id, deslocamento),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
