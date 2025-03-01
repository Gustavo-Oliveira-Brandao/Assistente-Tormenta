import { Atributo } from '@renderer/@types/t20/Atributo'
import { atualizarAtributo } from '@renderer/api/atributo/atualizarAtributo'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarAtributoMutation = (): UseMutationResult<
  void,
  Error,
  Atributo,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (atributo: Atributo) => atualizarAtributo(atributo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
