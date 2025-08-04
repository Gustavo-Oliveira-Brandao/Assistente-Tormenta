import { DeepPartial } from '@renderer/@types/DeepPartial'
import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { criarPoder, deletarPoder } from '@renderer/api/poder-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

type criarPoderVariaveis = {
  poder: DeepPartial<IPoder>
  nivel: number
  idPersonagem: number
}

export const useCriarPoder = (): UseMutationResult<void, Error, criarPoderVariaveis, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ poder, nivel, idPersonagem }) => criarPoder(poder, nivel, idPersonagem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['poderesPersonagem'] })
  })
}

export const useDeletarPoder = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deletarPoder(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['poderesPersonagem'] })
  })
}
