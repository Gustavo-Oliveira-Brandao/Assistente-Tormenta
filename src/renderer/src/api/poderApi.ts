import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'

export const exibirPoderesDefault = async (): Promise<Partial<IPoder[]>> => {
  return await window.api.poder.getPoderesDefault()
}

export const exibirPoderesPersonagem = async (idPersonagem: number): Promise<IPoder[]> => {
  return await window.api.poder.getPoderesPorPersonagem(idPersonagem)
}

export const exibirPoderesClasse = async (idClasse: number): Promise<Partial<IPoder[]>> => {
  return await window.api.poder.getPoderesPorClasse(idClasse)
}

export const criarPoder = async (poder: Partial<IPoder>, idPersonagem: number): Promise<void> => {
  await window.api.poder.postPoder(poder, idPersonagem)
}

export const deletarPoder = async (id: number): Promise<void> => {
  await window.api.poder.deletePoder(id)
}
