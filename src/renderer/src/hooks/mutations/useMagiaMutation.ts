import { DeepPartial } from '@renderer/@types/DeepPartial'
import { IMagia } from '@renderer/@types/T20 GOTY/IMagia'
import { atualizarMagia, criarMagia, deletarMagia } from '@renderer/api/magia-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

type atualizarMagiaMutation = {
  id: number
  magia: IMagia
}

export const useAtualizarMagia = (): UseMutationResult<
  void,
  Error,
  atualizarMagiaMutation,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, magia }) => atualizarMagia(id, magia),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grimorio'] })
  })
}

type criarMagiaVariaveis = {
  magia: DeepPartial<IMagia>
  idGrimorio: number
}

export const useCriarMagia = (): UseMutationResult<void, Error, criarMagiaVariaveis, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (x: criarMagiaVariaveis) => criarMagia(x.magia, x.idGrimorio),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grimorio'] })
  })
}

export const useDeletarMagia = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deletarMagia(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grimorio'] })
  })
}
