import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { exibirPersonagemPorId, exibirTodosPersonagens } from '@renderer/api/personagem-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirTodosPersonagem = (): UseQueryResult<IPersonagem[]> => {
  return useQuery({
    queryKey: ['personagens'],
    queryFn: () => exibirTodosPersonagens()
  })
}

export const useExibirPersonagemPorId = (id: number): UseQueryResult<IPersonagem> => {
  return useQuery({
    queryKey: ['personagem'],
    queryFn: () => exibirPersonagemPorId(id)
  })
}
