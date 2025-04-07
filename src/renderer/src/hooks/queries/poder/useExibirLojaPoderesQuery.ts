import { IPoder } from '@renderer/@types/t20/Poder'
import { exibirLojaPoderes } from '@renderer/api/poder/exibirLojaPoderes'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useExibirLojaPoderesQuery = (): UseQueryResult<IPoder[]> => {
  return useQuery({
    queryKey: ['poderesDefault'],
    queryFn: () => exibirLojaPoderes()
  })
}
