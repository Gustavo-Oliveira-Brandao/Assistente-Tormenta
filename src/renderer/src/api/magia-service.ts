import { DeepPartial } from '@renderer/@types/DeepPartial'
import { IGrimorio, IMagia } from '@renderer/@types/T20 GOTY/IMagia'

export const exibirGrimorioPersonagem = async (idPersonagem: number): Promise<IGrimorio> => {
  return await window.api.magias.getGrimorioPersonagem(idPersonagem)
}

export const atualizarMagia = async (id: number, magia: IMagia): Promise<void> => {
  await window.api.magias.putMagia(id, magia)
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
