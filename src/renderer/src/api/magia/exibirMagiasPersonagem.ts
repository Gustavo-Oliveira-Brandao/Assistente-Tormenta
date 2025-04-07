import { IMagia } from '@renderer/@types/t20/Magia'

export const exibirMagiasPersonagem = async (_idPersonagem: number): Promise<IMagia[]> => {
  const magias = await window.api.getMagiasPersonagem(_idPersonagem)
  return magias
}
