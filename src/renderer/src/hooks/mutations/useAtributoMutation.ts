import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { atualizarAtributo } from '@renderer/api/atributo-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useAtualizarAtributo = (): UseMutationResult<void, Error, IAtributo, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (atributo: IAtributo) => atualizarAtributo(atributo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
