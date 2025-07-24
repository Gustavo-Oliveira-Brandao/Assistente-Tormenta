import { DeepPartial } from '@renderer/@types/DeepPartial'
import { IProficiencia } from '@renderer/@types/T20 GOTY/IProficiencia'

export const criarProficiencia = async (
  proficiencia: DeepPartial<IProficiencia>,
  idPersonagem: number
): Promise<void> => {
  await window.api.proficiencias.postProficiencia(proficiencia, idPersonagem)
}

export const atualizarProficiencia = async (id: number, proficiencia: IProficiencia): Promise<void> => {
  await window.api.proficiencias.putProficiencia(id, proficiencia)
}

export const deletarProficiencia = async (id: number): Promise<void> => {
  await window.api.proficiencias.deleteProficiencia(id)
}
