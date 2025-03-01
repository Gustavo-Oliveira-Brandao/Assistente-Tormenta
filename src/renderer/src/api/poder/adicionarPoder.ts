import { Poder } from '@renderer/@types/t20/Poder'

export const adicionarPoder = async (poder: Poder, idPersonagem: number): Promise<void> => {
  await window.api.postPoder(poder, idPersonagem)
}
