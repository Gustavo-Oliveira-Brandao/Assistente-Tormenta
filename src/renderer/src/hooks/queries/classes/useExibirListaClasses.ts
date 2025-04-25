import { IClasseT20 } from '@renderer/@types/t20/Classe'
import { exibirClasses } from '@renderer/api/classe/exibirClasses'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirListaClasses = (): UseQueryResult<IClasseT20[]> => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: () => exibirClasses()
  })
}
