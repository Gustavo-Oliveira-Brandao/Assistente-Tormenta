import { Defesa } from '@renderer/@types/t20/Defesa'
import { atualizarDefesa } from '@renderer/api/defesa/atualizarDefesa'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarDefesaMutation = (): UseMutationResult<void, Error, Defesa, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (defesa: Defesa) => atualizarDefesa(defesa),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
