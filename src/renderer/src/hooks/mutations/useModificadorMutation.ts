import { IModificador } from '@renderer/@types/T20 GOTY/IModificador'
import {
  atualizarModificador,
  criarModificador,
  deletarModificador
} from '@renderer/api/modificador-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

type criarModificadorVariaveis = {
  modificador: Partial<IModificador>
  idPersonagem: number
}

export const useCriarModificador = (): UseMutationResult<
  void,
  Error,
  criarModificadorVariaveis,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ modificador, idPersonagem }) => criarModificador(modificador, idPersonagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}

export const useAtualizarModificador = (): UseMutationResult<
  void,
  Error,
  IModificador,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (modificador) => atualizarModificador(modificador),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}

export const useDeletarModificador = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletarModificador(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
