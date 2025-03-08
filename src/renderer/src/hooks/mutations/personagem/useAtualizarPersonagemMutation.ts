import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { atualizarPersonagem } from '@renderer/api/personagem/atualizarPersonagem'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarPersonagemMutation = (): UseMutationResult<
  void,
  Error,
  PersonagemT20,
  void
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (_personagem: PersonagemT20) => atualizarPersonagem(_personagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
