import { IProficiencia } from '@renderer/@types/T20 GOTY/IProficiencia'
import { DeepPartial } from 'typeorm'

export const exibirProficienciasPersonagem = async (
  idPersonagem: number
): Promise<IProficiencia[]> => {
  return await window.api.proficiencia.getProficienciasPorPersonagem(idPersonagem)
}

export const criarProficiencia = async (
  proficiencia: DeepPartial<IProficiencia>,
  idPersonagem: number
): Promise<void> => {
  await window.api.proficiencia.postProficiencia(proficiencia, idPersonagem)
}

export const atualizarProficiencia = async (proficiencia: IProficiencia): Promise<void> => {
  await window.api.proficiencia.putProficiencia(proficiencia)
}

export const deletarProficiencia = async (id: number): Promise<void> => {
  await window.api.proficiencia.deleteProficiencia(id)
}
