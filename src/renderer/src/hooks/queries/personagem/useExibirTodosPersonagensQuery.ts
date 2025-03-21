import { ICriatura } from '@renderer/@types/t20/Criatura'
import { exibirTodosPersonagens } from '@renderer/api/personagem/exibirTodosPersonagens'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useExibirTodosPersonagensQuery = (): UseQueryResult<ICriatura[], Error> => {
  return useQuery({
    queryKey: ['personagens'],
    queryFn: () => exibirTodosPersonagens()
  })
}
