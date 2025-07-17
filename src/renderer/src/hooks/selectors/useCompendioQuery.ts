import { ICompendio } from '@renderer/@types/T20 GOTY/ICompendio'
import { exibirCompendio } from '@renderer/api/compendio-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirCompendio = (): UseQueryResult<ICompendio> => {
  return useQuery({
    queryKey: ['compendio'],
    queryFn: () => exibirCompendio()
  })
}
