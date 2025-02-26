import { Recurso } from '@renderer/@types/t20/Recurso'
import { atualizarVida, atualizarMana } from '@renderer/api/personagemApi'
import { UseMutationResult, useQueryClient, useMutation } from '@tanstack/react-query'

export const useAtualizarVidaMutation = (): UseMutationResult<void, Error, Recurso, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (vida: Recurso) => atualizarVida(vida),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}

export const useAtualizarManaMutation = (): UseMutationResult<void, Error, Recurso, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (mana: Recurso) => atualizarMana(mana),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
