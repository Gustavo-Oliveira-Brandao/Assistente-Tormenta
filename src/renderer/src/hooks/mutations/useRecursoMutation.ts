import { IRecurso } from '@renderer/@types/T20 GOTY/IRecurso'
import { atualizarRecurso } from '@renderer/api/recurso-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarRecurso = (): UseMutationResult<void, Error, IRecurso, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (recurso) => atualizarRecurso(recurso),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
