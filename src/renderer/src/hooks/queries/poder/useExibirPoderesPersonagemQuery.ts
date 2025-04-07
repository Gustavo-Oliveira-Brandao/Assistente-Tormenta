import { IPoder } from '@renderer/@types/t20/Poder'
import { exibirPoderesPersonagem } from '@renderer/api/poder/exibirPoderesPersonagem'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirPoderesPersonagemQuery = (
  _idPersonagem: number
): UseQueryResult<IPoder[], Error> => {
  return useQuery({
    queryKey: ['poderes'],
    queryFn: () => exibirPoderesPersonagem(_idPersonagem)
  })
}
