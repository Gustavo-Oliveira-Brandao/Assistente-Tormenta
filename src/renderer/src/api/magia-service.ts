import { IMagiaPersonagem } from '@renderer/@types/T20 GOTY/IMagia'
import { DeepPartial } from 'typeorm'

export const exibirMagiasPersonagem = async (idPersonagem: number): Promise<IMagiaPersonagem[]> => {
  return await window.api.magias.getMagiasPersonagem(idPersonagem)
}

export const exibirMagiasDefault = async (): Promise<DeepPartial<IMagiaPersonagem>[]> => {
  return await window.api.magias.getMagiasDefault()
}

export const atualizarMagia = async (magia: IMagiaPersonagem): Promise<void> => {
  await window.api.magias.putMagia(magia)
}

export const criarMagia = async (
  magia: DeepPartial<IMagiaPersonagem>,
  idPersonagem: number
): Promise<void> => {
  await window.api.magias.postMagia(magia, idPersonagem)
}

export const deletarMagia = async (id: number): Promise<void> => {
  await window.api.magias.deleteMagia(id)
}
