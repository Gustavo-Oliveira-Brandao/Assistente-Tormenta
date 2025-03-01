import { Poder } from '@renderer/@types/t20/Poder'
import { adicionarPoder } from '@renderer/api/poder/adicionarPoder'
import { UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query'

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
