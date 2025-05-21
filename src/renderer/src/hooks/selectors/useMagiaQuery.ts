import { IGrimorio } from '@renderer/@types/T20 GOTY/IGrimorio'
import { exibirGrimoriosPersonagem } from '@renderer/api/magia-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirGrimoriosPersonagem = (idPersonagem: number): UseQueryResult<IGrimorio[]> => {
  return useQuery({
    queryKey: ['grimorios'],
    queryFn: () => exibirGrimoriosPersonagem(idPersonagem)
  })
}
