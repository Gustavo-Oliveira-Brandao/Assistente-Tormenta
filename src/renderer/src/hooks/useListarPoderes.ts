import { Poder } from '@renderer/@types/t20/Poder'
import { listarPoderesDefault } from '@renderer/api/poderApi'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useListarPoderesQuery = (): UseQueryResult<Poder[]> => {
  const query = useQuery({
    queryKey: ['poderes'],
    queryFn: () => listarPoderesDefault()
  })
  return query
}
