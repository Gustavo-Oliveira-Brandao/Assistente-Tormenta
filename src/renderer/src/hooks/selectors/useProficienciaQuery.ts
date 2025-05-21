import { IProficiencia } from '@renderer/@types/T20 GOTY/IProficiencia'
import { exibirProficienciasPersonagem } from '@renderer/api/proficiencia-service'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useExibirProficienciasPersonagem = (
  idPersonagem: number
): UseQueryResult<IProficiencia[]> => {
  return useQuery({
    queryKey: ['proficiencias'],
    queryFn: () => exibirProficienciasPersonagem(idPersonagem)
  })
}
