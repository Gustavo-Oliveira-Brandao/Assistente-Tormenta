import { IPoderDB, IPoderRef } from '@renderer/@types/T20 GOTY/IPoder'

export const exibirPoderesDefault = async (): Promise<IPoderDB[]> => {
  const poderes = await window.api.poder.getPoderesDefault()
  return poderes
}

export const exibirPoderesPersonagem = async (_idPersonagem: number): Promise<IPoderRef[]> => {
  const poderes = await window.api.poder.getPoderesPersonagem(_idPersonagem)
  return poderes
}

export const criarPoder = async (
  poder: IPoderDB,
  nivelPersonagem: number,
  idPersonagem: number
): Promise<void> => {
  const poderRef: Partial<IPoderRef> = {
    key: poder.key,
    nivel: nivelPersonagem
  }
  await window.api.poder.postPoder(poderRef, idPersonagem)
}

export const deletarPoder = async (id: number): Promise<void> => {
  await window.api.poder.deletePoder(id)
}
