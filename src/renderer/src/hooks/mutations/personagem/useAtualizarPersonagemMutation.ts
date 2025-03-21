import { ICriatura } from '@renderer/@types/t20/Criatura'
import { atualizarPersonagem } from '@renderer/api/personagem/atualizarPersonagem'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarPersonagemMutation = (): UseMutationResult<
  void,
  Error,
  ICriatura,
  void
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (_personagem: ICriatura) => atualizarPersonagem(_personagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
