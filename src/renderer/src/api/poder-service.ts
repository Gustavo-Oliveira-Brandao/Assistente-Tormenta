import { IPoderDTO, IPoderPersonagem } from '@renderer/@types/T20 GOTY/IPoder'
import { DeepPartial } from 'typeorm'

export const exibirPoderesDefault = async (): Promise<DeepPartial<IPoderPersonagem>[]> => {
  const poderes = await window.api.poderes.getPoderesDefault()
  return poderes
}

export const exibirPoderesPersonagem = async (
  _idPersonagem: number
): Promise<IPoderPersonagem[]> => {
  const poderes = await window.api.poderes.getPoderesPersonagem(_idPersonagem)
  return poderes
}

export const criarPoder = async (poder: IPoderDTO, idPersonagem: number): Promise<void> => {
  await window.api.poderes.postPoder(poder, idPersonagem)
}

export const deletarPoder = async (id: number): Promise<void> => {
  await window.api.poderes.deletePoder(id)
}
