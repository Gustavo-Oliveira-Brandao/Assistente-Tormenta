import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import {
  atualizarPersonagem,
  criarPersonagem,
  deletarPersonagem
} from '@renderer/api/personagem-service'
import { criarPersonagemDemo } from '@renderer/api/teste-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

export const useCriarPersonagem = (): UseMutationResult<
  void,
  Error,
  DeepPartial<IPersonagem>,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (personagem: DeepPartial<IPersonagem>) => criarPersonagem(personagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagens'] })
  })
}

export const useCriarPersonagemDemo = (): UseMutationResult<void, Error, void, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => criarPersonagemDemo(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagens'] })
  })
}

export const useAtualizarPersonagem = (): UseMutationResult<void, Error, IPersonagem, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (personagem: IPersonagem) => atualizarPersonagem(personagem),
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
