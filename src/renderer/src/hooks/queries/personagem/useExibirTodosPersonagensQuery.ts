import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { exibirTodosPersonagens } from '@renderer/api/personagem/exibirTodosPersonagens'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useExibirTodosPersonagensQuery = (): UseQueryResult<PersonagemT20[], Error> => {
  return useQuery({
    queryKey: ['personagens'],
    queryFn: () => exibirTodosPersonagens()
  })
}
