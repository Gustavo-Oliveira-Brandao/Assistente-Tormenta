import { IRecurso } from '@renderer/@types/t20/Recurso'
import { atualizarVida } from '@renderer/api/recurso/atualizarVida'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarVidaMutation = (): UseMutationResult<void, Error, IRecurso, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (vida: IRecurso) => atualizarVida(vida),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
