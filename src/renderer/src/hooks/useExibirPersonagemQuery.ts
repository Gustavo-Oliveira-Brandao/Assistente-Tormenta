import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { exibirPersonagemTeste } from '@renderer/api/personagem'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirPersonagemQuery = (id: number): UseQueryResult<PersonagemT20, Error> => {
  const query = useQuery({
    queryKey: ['personagem', id],
    queryFn: () => exibirPersonagemTeste()
  })
  return query
}
