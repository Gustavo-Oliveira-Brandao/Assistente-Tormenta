import { IMagiaPersonagem } from '@renderer/@types/T20 GOTY/IMagia'
import { exibirMagiasDefault, exibirMagiasPersonagem } from '@renderer/api/magia-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

export const useExibirMagiasPersonagem = (
  idPersonagem: number
): UseQueryResult<IMagiaPersonagem[]> => {
  return useQuery({
    queryKey: ['magias'],
    queryFn: () => exibirMagiasPersonagem(idPersonagem)
  })
}

export const useExibirCompendioMagias = (): UseQueryResult<DeepPartial<IMagiaPersonagem>[]> => {
  return useQuery({
    queryKey: ['compendioMagias'],
    queryFn: () => exibirMagiasDefault()
  })
}
