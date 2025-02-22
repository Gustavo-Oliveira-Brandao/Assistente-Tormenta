import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import { exibirPersonagemPorId, exibirTodosPersonagens } from '@renderer/api/personagemApi'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirPersonagemQuery = (id: number): UseQueryResult<PersonagemT20, Error> => {
  return useQuery({
    queryKey: ['personagem'],
    queryFn: () => exibirPersonagemPorId(id)
  })
}

export const useExibirTodosPersonagensQuery = (): UseQueryResult<PersonagemT20[], Error> => {
  return useQuery({
    queryKey: ['personagens'],
    queryFn: () => exibirTodosPersonagens()
  })
}
