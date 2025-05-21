import { IGrimorio } from '@renderer/@types/T20 GOTY/IGrimorio'
import { IMagia } from '@renderer/@types/T20 GOTY/IMagia'
import {
  atualizarGrimorio,
  criarGrimorio,
  criarMagia,
  deletarGrimorio,
  deletarMagia
} from '@renderer/api/magia-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

type criarGrimorioVariaveis = {
  grimorio: DeepPartial<IGrimorio>
  idPersonagem: number
}

export const useCriarGrimorio = (): UseMutationResult<
  void,
  Error,
  criarGrimorioVariaveis,
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (x: criarGrimorioVariaveis) => criarGrimorio(x.grimorio, x.idPersonagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grimorios'] })
  })
}

export const useAtualizarGrimorio = (): UseMutationResult<void, Error, IGrimorio, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (grimorio) => atualizarGrimorio(grimorio),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grimorios'] })
  })
}

export const useDeletarGrimorio = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deletarGrimorio(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grimorios'] })
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grimorios'] })
  })
}

export const useDeletarMagia = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deletarMagia(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grimorios'] })
  })
}
