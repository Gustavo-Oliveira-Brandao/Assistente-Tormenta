import { IAtributo } from '@renderer/@types/t20/Atributo'
import { exibirAtributosDefault } from '@renderer/api/atributo/exibirAtributosDefault'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirAtributosDefaultQuery = (): UseQueryResult<IAtributo[]> => {
  return useQuery({
    queryKey: ['atributos'],
    queryFn: () => exibirAtributosDefault()
  })
}
