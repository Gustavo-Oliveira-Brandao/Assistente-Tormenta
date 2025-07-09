import { IMagiaPersonagem } from '@renderer/@types/T20 GOTY/IMagia'
import { atualizarMagia, criarMagia, deletarMagia } from '@renderer/api/magia-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

export const useAtualizarMagia = (): UseMutationResult<void, Error, IMagiaPersonagem, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (magia) => atualizarMagia(magia),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['magias'] })
  })
}

type criarMagiaVariaveis = {
  magia: DeepPartial<IMagiaPersonagem>
  idPersonagem: number
}

export const useCriarMagia = (): UseMutationResult<void, Error, criarMagiaVariaveis, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (x: criarMagiaVariaveis) => criarMagia(x.magia, x.idPersonagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['magias'] })
  })
}

export const useDeletarMagia = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deletarMagia(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['magias'] })
  })
}
