import { listarPoderesDefault } from '@renderer/api/poder'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useListarPoderesDefaultQuery = (): UseQueryResult => {
  const query = useQuery({
    queryKey: ['poderesDefault'],
    queryFn: listarPoderesDefault
  })
  return query
}
