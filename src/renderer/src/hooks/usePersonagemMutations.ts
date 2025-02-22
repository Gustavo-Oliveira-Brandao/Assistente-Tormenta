import { criarPersonagemDemo } from '@renderer/api/personagemApi'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useCriarPersonagemMutation = (): UseMutationResult<void, Error, void, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => criarPersonagemDemo(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagens'] })
  })
}
