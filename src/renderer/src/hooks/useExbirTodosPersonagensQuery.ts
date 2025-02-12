import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { exibirTodosPersonagens } from '@renderer/api/personagemApi'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirTodosPersonagensQuery = (): UseQueryResult<PersonagemT20[], Error> => {
  const query = useQuery({
    queryKey: ['personagens'],
    queryFn: () => exibirTodosPersonagens()
  })
  return query
}
