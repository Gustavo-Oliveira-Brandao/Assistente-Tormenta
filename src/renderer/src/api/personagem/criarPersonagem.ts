import { ICriatura } from '@renderer/@types/t20/Criatura'
import { DeepPartial } from 'react-hook-form'

export const criarPersonagem = async (_personagem: DeepPartial<ICriatura>): Promise<void> => {
  await window.api.postPersonagem(_personagem)
}
