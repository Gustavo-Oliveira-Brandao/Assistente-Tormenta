import { deletarPoder } from '@renderer/api/poder'
import { QueryClient, useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useRemoverPoderMutation = (
  queryClient: QueryClient
): UseMutationResult<AxiosResponse<void>, Error, number, unknown> => {
  const mutation = useMutation({
    mutationFn: (id: number) => deletarPoder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personagem'] })
    }
  })
  return mutation
}
