import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { exibirPersonagemPorId } from '@renderer/api/personagemApi'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirPersonagemQuery = (id: number): UseQueryResult<PersonagemT20, Error> => {
  const query = useQuery({
    queryKey: ['personagem', id],
    queryFn: () => exibirPersonagemPorId(id)
  })
  return query
}
