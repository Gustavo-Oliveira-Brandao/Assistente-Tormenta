import { QueryClient, useMutation, UseMutationResult } from '@tanstack/react-query'
import { Poder } from '../@types/t20/Poder'
import { adicionarPoder } from '@renderer/api/poder'

export const useAdicionarPoderMutation = (
  _idPersonagem: number,
  queryClient: QueryClient
): UseMutationResult<unknown, Error, Poder, unknown> => {
  const mutation = useMutation({
    mutationFn: (novoPoder: Poder) => adicionarPoder(_idPersonagem, novoPoder),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
  return mutation
}
