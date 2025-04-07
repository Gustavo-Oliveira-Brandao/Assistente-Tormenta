import { removerMagia } from '@renderer/api/magia/removerMagia'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useRemoverMagiaMutation = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => removerMagia(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['magias'] })
  })
}
