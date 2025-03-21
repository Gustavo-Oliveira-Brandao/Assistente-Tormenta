import { IAtributo } from '@renderer/@types/t20/Atributo'
import { atualizarAtributo } from '@renderer/api/atributo/atualizarAtributo'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarAtributoMutation = (): UseMutationResult<
  void,
  Error,
  IAtributo,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (atributo: IAtributo) => atualizarAtributo(atributo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
