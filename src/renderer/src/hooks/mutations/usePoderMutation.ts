import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { criarPoder, deletarPoder } from '@renderer/api/poder-service'
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

type criarPoderVariaveis = {
  poder: DeepPartial<IPoder>
  idNivel: number
}

export const useCriarPoder = (): UseMutationResult<void, Error, criarPoderVariaveis, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (x) => criarPoder(x.poder, x.idNivel),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['poderes'] })
  })
}

export const useDeletarPoder = (): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deletarPoder(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['poderes'] })
  })
}
