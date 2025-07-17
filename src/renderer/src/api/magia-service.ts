import { IGrimorio, IMagia } from '@renderer/@types/T20 GOTY/IMagia'
import { DeepPartial } from 'typeorm'

export const exibirGrimorioPersonagem = async (idPersonagem: number): Promise<IGrimorio> => {
  return await window.api.magias.getGrimorioPersonagem(idPersonagem)
}

export const atualizarMagia = async (magia: IMagia): Promise<void> => {
  await window.api.magias.putMagia(magia)
}

export const criarMagia = async (
  magia: DeepPartial<IMagia>,
  idPersonagem: number
): Promise<void> => {
  await window.api.magias.postMagia(magia, idPersonagem)
}

export const deletarMagia = async (id: number): Promise<void> => {
  await window.api.magias.deleteMagia(id)
}
