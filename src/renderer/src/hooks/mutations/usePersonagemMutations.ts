import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import {
  atualizarPersonagem,
  criarPersonagem,
  deletarPersonagem
} from '@renderer/api/personagem-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

export const useCriarPersonagem = (): UseMutationResult<void, Error, string, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (nomePersonagem) => criarPersonagem(nomePersonagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagens'] })
  })
}

type atualizarPersonagemMutation = {
  id: number
  personagem: IPersonagem
}

export const useAtualizarPersonagem = (): UseMutationResult<
  void,
  Error,
  atualizarPersonagemMutation,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, personagem }) => atualizarPersonagem(id, personagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}

export const useDeletarPersonagem = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletarPersonagem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagens'] })
  })
}
