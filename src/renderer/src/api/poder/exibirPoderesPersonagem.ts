import { IPoder } from '@renderer/@types/t20/Poder'

export const exibirPoderesPersonagem = async (_idPersonagem: number): Promise<IPoder[]> => {
  const poderes = await window.api.getPoderesPersonagem(_idPersonagem)
  return poderes
}
