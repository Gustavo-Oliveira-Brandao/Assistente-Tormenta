import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { DeepPartial } from 'typeorm'

export const exibirPoderesDefault = async (): Promise<DeepPartial<IPoder[]>> => {
  const poderes = await window.api.poder.getPoderesDefault()

  console.log(poderes)
  return poderes
}

export const exibirPoderesPersonagem = async (idPersonagem: number): Promise<IPoder[]> => {
  return await window.api.poder.getPoderesPorPersonagem(idPersonagem)
}

export const exibirPoderesClasse = async (idClasse: number): Promise<DeepPartial<IPoder[]>> => {
  return await window.api.poder.getPoderesPorClasse(idClasse)
}

export const criarPoder = async (
  poder: DeepPartial<IPoder>,
  idPersonagem: number
): Promise<void> => {
  await window.api.poder.postPoder(poder, idPersonagem)
}

export const deletarPoder = async (id: number): Promise<void> => {
  await window.api.poder.deletePoder(id)
}
