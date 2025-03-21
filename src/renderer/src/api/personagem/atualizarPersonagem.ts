import { ICriatura } from '@renderer/@types/t20/Criatura'

export const atualizarPersonagem = async (_personagem: ICriatura): Promise<void> => {
  await window.api.putPersonagem(_personagem)
}
