import { IPoderDB, IPoderRef } from '@renderer/@types/T20 GOTY/IPoder'
import { exibirPoderesDefault, exibirPoderesPersonagem } from '@renderer/api/poder-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirPoderesDefault = (): UseQueryResult<IPoderDB[]> => {
  return useQuery({
    queryKey: ['poderesDefault'],
    queryFn: () => exibirPoderesDefault()
  })
}

export const useExibirPoderesPersonagem = (_idPersonagem: number): UseQueryResult<IPoderRef[]> => {
  return useQuery({
    queryKey: ['poderesPersonagem'],
    queryFn: () => exibirPoderesPersonagem(_idPersonagem)
  })
}
