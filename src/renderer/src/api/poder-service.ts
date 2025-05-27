import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { DeepPartial } from 'typeorm'

export const exibirPoderesDefault = async (): Promise<DeepPartial<IPoder[]>> => {
  const poderes = await window.api.poder.getPoderesDefault()
  console.log(poderes)
  return poderes
}

export const exibirPoderesPorNivelPersonagem = async (idNivel: number): Promise<IPoder[]> => {
  return await window.api.poder.getPoderesPorPersonagem(idNivel)
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
