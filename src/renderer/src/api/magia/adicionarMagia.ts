import { IMagia } from '@renderer/@types/t20/Magia'

export const adicionarMagia = async (magia: IMagia, idPersonagem: number): Promise<void> => {
  await window.api.postMagia(magia, idPersonagem)
}
