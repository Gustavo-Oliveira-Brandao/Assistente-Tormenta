import { IEfeito } from '@renderer/@types/T20 GOTY/IEfeito'
import { atualizarEfeito, criarEfeito, deletarEfeito } from '@renderer/api/efeito-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

type criarEfeitoVariaveis = {
  efeito: DeepPartial<IEfeito>
  idPersonagem: number
}

export const useCriarEfeito = (): UseMutationResult<void, Error, criarEfeitoVariaveis, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ efeito, idPersonagem }) => criarEfeito(efeito, idPersonagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}

export const useAtualizarEfeito = (): UseMutationResult<void, Error, IEfeito, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (efeito) => atualizarEfeito(efeito),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}

export const useDeletarEfeito = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletarEfeito(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
