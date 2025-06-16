import { IPoderPersonagem } from '@renderer/@types/T20 GOTY/IPoder'
import { exibirPoderesDefault, exibirPoderesPersonagem } from '@renderer/api/poder-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

export const useExibirPoderesDefault = (): UseQueryResult<DeepPartial<IPoderPersonagem>[]> => {
  return useQuery({
    queryKey: ['poderesDefault'],
    queryFn: () => exibirPoderesDefault()
  })
}

export const useExibirPoderesPersonagem = (
  _idPersonagem: number
): UseQueryResult<IPoderPersonagem[]> => {
  return useQuery({
    queryKey: ['poderesPersonagem'],
    queryFn: () => exibirPoderesPersonagem(_idPersonagem)
  })
}
