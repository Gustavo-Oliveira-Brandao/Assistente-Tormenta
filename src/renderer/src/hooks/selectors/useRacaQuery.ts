import { IRaca } from '@renderer/@types/T20 GOTY/IRaca'
import { exibirRacasDefault } from '@renderer/api/raca-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirRacasDefault = (): UseQueryResult<IRaca[]> => {
  return useQuery({
    queryKey: ['racasDefault'],
    queryFn: () => exibirRacasDefault()
  })
}
