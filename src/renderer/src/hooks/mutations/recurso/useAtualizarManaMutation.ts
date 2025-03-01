import { Recurso } from '@renderer/@types/t20/Recurso'
import { atualizarMana } from '@renderer/api/recurso/atualizarMana'
import { UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query'

export const useAtualizarManaMutation = (): UseMutationResult<void, Error, Recurso, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (mana: Recurso) => atualizarMana(mana),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
