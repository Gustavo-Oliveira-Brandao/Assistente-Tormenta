import { Poder } from '@renderer/@types/t20/Poder'
import { adicionarPoder, deletarPoder } from '@renderer/api/personagemApi'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAdicionarPoderMutation = (): UseMutationResult<
  void,
  Error,
  { poder: Poder; idPersonagem: number },
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ poder, idPersonagem }: { poder: Poder; idPersonagem: number }) =>
      adicionarPoder(poder, idPersonagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}

export const useDeletarPoderMutation = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletarPoder(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
