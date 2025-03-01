import { criarPersonagemDefault } from '@renderer/api/personagem/criarPersonagemDefault'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useCriarPersonagemMutation = (): UseMutationResult<void, Error, void, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => criarPersonagemDefault(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagens'] })
  })
}
