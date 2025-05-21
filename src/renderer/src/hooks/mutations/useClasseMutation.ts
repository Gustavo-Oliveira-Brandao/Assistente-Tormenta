import { IClasse } from '@renderer/@types/T20 GOTY/IClasse'
import { atualizarClasse, criarClasse, deletarClasse } from '@renderer/api/classe-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

type criarClasseVariables = {
  classe: DeepPartial<IClasse>
  idPersonagem: number
}

export const useCriarClasseMutation = (): UseMutationResult<
  void,
  Error,
  criarClasseVariables,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (x: criarClasseVariables) => criarClasse(x.classe, x.idPersonagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}

export const useAtualizarClasse = (): UseMutationResult<void, Error, IClasse, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (classe) => atualizarClasse(classe),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}

export const useDeletarClasse = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deletarClasse(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personagem'] })
  })
}
