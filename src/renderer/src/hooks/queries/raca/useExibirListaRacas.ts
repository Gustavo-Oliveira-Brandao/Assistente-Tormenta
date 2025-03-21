import { IRacaT20 } from '@renderer/@types/t20/Raca'
import { exibirRacas } from '@renderer/api/raca/exibirRacas'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirListaRacas = (): UseQueryResult<IRacaT20[]> => {
  return useQuery({
    queryKey: ['racas'],
    queryFn: () => exibirRacas()
  })
}
