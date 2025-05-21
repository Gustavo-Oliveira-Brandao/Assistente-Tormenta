import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import {
  exibirPoderesClasse,
  exibirPoderesDefault,
  exibirPoderesPersonagem
} from '@renderer/api/poder-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { DeepPartial } from 'typeorm'

export const useExibirPoderesDefault = (): UseQueryResult<DeepPartial<IPoder[]>> => {
  return useQuery({
    queryKey: ['poderesDefault'],
    queryFn: () => exibirPoderesDefault()
  })
}

export const useExibirPoderesPersonagem = (idPersonagem: number): UseQueryResult<IPoder[]> => {
  return useQuery({
    queryKey: ['poderes'],
    queryFn: () => exibirPoderesPersonagem(idPersonagem)
  })
}

export const useExibirPoderesClasse = (idClasse: number): UseQueryResult<DeepPartial<IPoder[]>> => {
  return useQuery({
    queryKey: ['poderesClasse'],
    queryFn: () => exibirPoderesClasse(idClasse)
  })
}
