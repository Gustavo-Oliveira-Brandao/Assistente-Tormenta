import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { exibirPoderesPersonagem } from '@renderer/api/poder-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirPoderesPersonagem = (_idPersonagem: number): UseQueryResult<IPoder[]> => {
  return useQuery({
    queryKey: ['poderesPersonagem'],
    queryFn: () => exibirPoderesPersonagem(_idPersonagem)
  })
}
