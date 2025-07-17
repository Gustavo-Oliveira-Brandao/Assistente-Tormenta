import { IGrimorio } from '@renderer/@types/T20 GOTY/IMagia'
import { exibirGrimorioPersonagem } from '@renderer/api/magia-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirMagiasPersonagem = (idPersonagem: number): UseQueryResult<IGrimorio> => {
  return useQuery({
    queryKey: ['grimorio'],
    queryFn: () => exibirGrimorioPersonagem(idPersonagem)
  })
}
