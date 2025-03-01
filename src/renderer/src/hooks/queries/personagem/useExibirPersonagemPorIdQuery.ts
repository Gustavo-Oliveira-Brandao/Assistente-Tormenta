import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { exibirPersonagemPorId } from '@renderer/api/personagem/exibirPersonagemPorId'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useExibirPersonagemPorIdQuery = (id: number): UseQueryResult<PersonagemT20, Error> => {
  return useQuery({
    queryKey: ['personagem'],
    queryFn: () => exibirPersonagemPorId(id)
  })
}
