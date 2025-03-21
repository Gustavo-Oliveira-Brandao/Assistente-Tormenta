import { ICriatura } from '@renderer/@types/t20/Criatura'
import { exibirPersonagemPorId } from '@renderer/api/personagem/exibirPersonagemPorId'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useExibirPersonagemPorIdQuery = (id: number): UseQueryResult<ICriatura, Error> => {
  return useQuery({
    queryKey: ['personagem'],
    queryFn: () => exibirPersonagemPorId(id)
  })
}
