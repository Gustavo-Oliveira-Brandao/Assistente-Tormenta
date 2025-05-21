import { IProficiencia } from '@renderer/@types/T20 GOTY/IProficiencia'
import {
  atualizarProficiencia,
  criarProficiencia,
  deletarProficiencia
} from '@renderer/api/proficiencia-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

type criarProficienciaVariaveis = {
  proficiencia: DeepPartial<IProficiencia>
  idPersonagem: number
}

export const useCriarProficiencia = (): UseMutationResult<
  void,
  Error,
  criarProficienciaVariaveis,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (x) => criarProficiencia(x.proficiencia, x.idPersonagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['proficiencias'] })
  })
}

export const useAtualizarProficiencia = (): UseMutationResult<
  void,
  Error,
  IProficiencia,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (proficiencia) => atualizarProficiencia(proficiencia),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['proficiencias'] })
  })
}

export const useDeletarProficiencia = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deletarProficiencia(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['proficiencias'] })
  })
}
