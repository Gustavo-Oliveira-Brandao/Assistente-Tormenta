import { IMagia } from '@renderer/@types/t20/Magia'
import { exibirLojaMagias } from '@renderer/api/magia/exibirLojaMagias'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirLojaMagiasQuery = (): UseQueryResult<IMagia[]> => {
  return useQuery({
    queryKey: ['magiasDefault'],
    queryFn: () => exibirLojaMagias()
  })
}
