import { IClasse } from '@renderer/@types/T20 GOTY/IClasse'
import { exibirClassesDefault } from '@renderer/api/classe-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { DeepPartial } from 'react-hook-form'

export const useExibirClassesDefault = (): UseQueryResult<DeepPartial<IClasse[]>> => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: () => exibirClassesDefault()
  })
}
