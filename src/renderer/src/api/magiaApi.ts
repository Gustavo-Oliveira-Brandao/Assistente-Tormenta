import { IGrimorio } from '@renderer/@types/T20 GOTY/IGrimorio'
import { IMagia } from '@renderer/@types/T20 GOTY/IMagia'

export const exibirGrimorios = async (idPersonagem: number): Promise<IGrimorio[]> => {
  return await window.api.magia.getGrimoriosPorPersonagem(idPersonagem)
}

export const criarGrimorio = async (
  grimorio: Partial<IGrimorio>,
  idPersonagem: number
): Promise<void> => {
  await window.api.magia.postGrimorio(grimorio, idPersonagem)
}

export const atualizarGrimorio = async (grimorio: IGrimorio): Promise<void> => {
  await window.api.magia.putGrimorio(grimorio)
}

export const deletarGrimorio = async (id: number): Promise<void> => {
  await window.api.magia.deleteGrimorio(id)
}

export const criarMagia = async (magia: Partial<IMagia>, idGrimorio: number): Promise<void> => {
  await window.api.magia.postMagia(magia, idGrimorio)
}

export const deletarMagia = async (id: number): Promise<void> => {
  await window.api.magia.deleteMagia(id)
}
