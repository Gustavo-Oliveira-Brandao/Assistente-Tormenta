import { Poder } from '@renderer/@types/t20/Poder'
import { exibirLojaPoderes } from '@renderer/api/poder/exibirLojaPoderes'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const useExibirLojaPoderesQuery = (): UseQueryResult<Poder[]> => {
  return useQuery({
    queryKey: ['poderes'],
    queryFn: () => exibirLojaPoderes()
  })
}
