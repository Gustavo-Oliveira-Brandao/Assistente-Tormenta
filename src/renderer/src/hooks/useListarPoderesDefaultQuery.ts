import { Poder } from '@renderer/@types/t20/Poder'
import { listarPoderesDefault } from '@renderer/api/poder'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useListarPoderesDefaultQuery = (): UseQueryResult<Poder[]> => {
  const query = useQuery({
    queryKey: ['poderesDefault'],
    queryFn: () => listarPoderesDefault()
  })
  return query
}
