import { removerPoder } from '@renderer/api/poder/removerPoder'
import { UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query'

export const useRemoverPoderMutation = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => removerPoder(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['poderes'] })
  })
}
