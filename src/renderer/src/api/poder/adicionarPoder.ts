import { IPoder } from '@renderer/@types/t20/Poder'

export const adicionarPoder = async (poder: IPoder, idPersonagem: number): Promise<void> => {
  console.log(Date.now())
  await window.api.postPoder(poder, idPersonagem)
}
