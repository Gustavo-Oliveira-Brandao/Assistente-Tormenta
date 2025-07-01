import { IGrimorio } from '@renderer/@types/T20 GOTY/IGrimorio'
import { IMagiaPersonagem } from '@renderer/@types/T20 GOTY/IMagia'
import { DeepPartial } from 'typeorm'

export const exibirGrimoriosPersonagem = async (idPersonagem: number): Promise<IGrimorio[]> => {
  return await window.api.magias.getGrimoriosPorPersonagem(idPersonagem)
}

export const exibirMagiasDefault = async (): Promise<DeepPartial<IMagiaPersonagem>[]> => {
  return await window.api.magias.getMagiasDefault()
}

export const criarGrimorio = async (
  grimorio: DeepPartial<IGrimorio>,
  idPersonagem: number
): Promise<void> => {
  await window.api.magias.postGrimorio(grimorio, idPersonagem)
}

export const atualizarGrimorio = async (grimorio: IGrimorio): Promise<void> => {
  await window.api.magias.putGrimorio(grimorio)
}

export const deletarGrimorio = async (id: number): Promise<void> => {
  await window.api.magias.deleteGrimorio(id)
}

export const criarMagia = async (magia: DeepPartial<IMagiaPersonagem>, idGrimorio: number): Promise<void> => {
  await window.api.magias.postMagia(magia, idGrimorio)
}

export const deletarMagia = async (id: number): Promise<void> => {
  await window.api.magias.deleteMagia(id)
}
