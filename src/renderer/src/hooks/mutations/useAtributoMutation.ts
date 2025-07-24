import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { atualizarAtributo } from '@renderer/api/atributo-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

type atualizarAtributoMutation = {
  id: number
  atributo: IAtributo
}

export const useAtualizarAtributo = (): UseMutationResult<
  void,
  Error,
  atualizarAtributoMutation,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, atributo }) => atualizarAtributo(id, atributo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
