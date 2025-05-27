import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { exibirPoderesDefault, exibirPoderesPorNivelPersonagem } from '@renderer/api/poder-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

export const useExibirPoderesDefault = (): UseQueryResult<DeepPartial<IPoder[]>> => {
  return useQuery({
    queryKey: ['poderesDefault'],
    queryFn: () => exibirPoderesDefault()
  })
}

export const useExibirPoderesPersonagem = (idNivel: number): UseQueryResult<IPoder[]> => {
  return useQuery({
    queryKey: ['poderes'],
    queryFn: () => exibirPoderesPorNivelPersonagem(idNivel)
  })
}
