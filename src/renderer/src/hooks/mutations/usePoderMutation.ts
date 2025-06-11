import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { criarPoder, deletarPoder } from '@renderer/api/poder-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

type criarPoderVariaveis = {
  poder: DeepPartial<IPoder>
  nivelPoder: number
}

export const useCriarPoder = (): UseMutationResult<void, Error, criarPoderVariaveis, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ poder, nivelPoder }) => criarPoder(poder, nivelPoder),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['progressao'] })
  })
}

export const useDeletarPoder = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deletarPoder(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['progressao'] })
  })
}
