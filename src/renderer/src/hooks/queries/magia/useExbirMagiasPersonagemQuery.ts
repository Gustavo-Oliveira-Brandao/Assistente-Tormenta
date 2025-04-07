import { IMagia } from '@renderer/@types/t20/Magia'
import { exibirMagiasPersonagem } from '@renderer/api/magia/exibirMagiasPersonagem'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExbirMagiasPersonagemQuery = (
  _idPersonagem: number
): UseQueryResult<IMagia[], Error> => {
  return useQuery({
    queryKey: ['magias'],
    queryFn: () => exibirMagiasPersonagem(_idPersonagem)
  })
}
