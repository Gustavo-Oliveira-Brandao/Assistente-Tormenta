import { ICriatura } from '@renderer/@types/t20/Criatura'

export const criarPersonagem = async (_personagem: ICriatura): Promise<void> => {
  await window.api.postPersonagem(_personagem)
}
