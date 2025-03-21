import { IPoder } from '@renderer/@types/t20/Poder'

export const adicionarPoder = async (poder: IPoder, idPersonagem: number): Promise<void> => {
  await window.api.postPoder(poder, idPersonagem)
}
