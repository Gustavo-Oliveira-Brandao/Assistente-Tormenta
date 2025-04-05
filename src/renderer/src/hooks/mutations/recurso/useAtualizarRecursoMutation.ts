import { IRecurso } from '@renderer/@types/t20/Recurso'
import { atualizarRecurso } from '@renderer/api/recurso/atualizarRecurso'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarRecursoMutation = (): UseMutationResult<
  void,
  Error,
  IRecurso,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (recurso: IRecurso) => atualizarRecurso(recurso),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
