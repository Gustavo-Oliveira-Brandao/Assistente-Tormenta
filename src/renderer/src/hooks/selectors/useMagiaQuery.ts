import { IGrimorio } from '@renderer/@types/T20 GOTY/IGrimorio'
import { IMagiaDB } from '@renderer/@types/T20 GOTY/IMagia'
import { exibirGrimoriosPersonagem, exibirMagiasDefault } from '@renderer/api/magia-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirGrimoriosPersonagem = (idPersonagem: number): UseQueryResult<IGrimorio[]> => {
  return useQuery({
    queryKey: ['grimorios'],
    queryFn: () => exibirGrimoriosPersonagem(idPersonagem)
  })
}

export const useExibirMagiasDefault = (): UseQueryResult<IMagiaDB[]> => {
  return useQuery({
    queryKey: ['magiasDefault'],
    queryFn: () => exibirMagiasDefault()
  })
}
