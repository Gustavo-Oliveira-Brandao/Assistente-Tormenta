import { IRaca } from '@renderer/@types/T20 GOTY/IRaca'
import { exibirRacasDefault } from '@renderer/api/raca-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

export const useExibirRacasDefault = (): UseQueryResult<DeepPartial<IRaca[]>> => {
  return useQuery({
    queryKey: ['racasDefault'],
    queryFn: () => exibirRacasDefault()
  })
}
