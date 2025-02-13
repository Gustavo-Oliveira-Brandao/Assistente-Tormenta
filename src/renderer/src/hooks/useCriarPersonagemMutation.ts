import { criarPersonagemDemo } from '@renderer/api/personagemApi'
import { QueryClient, useMutation, UseMutationResult } from '@tanstack/react-query'

export const useCriarPersonagemMutation = (
  queryClient: QueryClient
): UseMutationResult<void, Error, void, unknown> => {
  const mutation = useMutation({
    mutationFn: () => criarPersonagemDemo(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagens'] })
  })
  return mutation
}
