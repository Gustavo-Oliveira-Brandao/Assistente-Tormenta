import { DeepPartial } from '@renderer/@types/DeepPartial'
import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'

export const exibirPoderesPersonagem = async (_idPersonagem: number): Promise<IPoder[]> => {
  const poderes = await window.api.poderes.getPoderesPersonagem(_idPersonagem)
  return poderes
}

export const criarPoder = async (
  poder: DeepPartial<IPoder>,
  nivelPoder: number,
  idPersonagem: number
): Promise<void> => {
  await window.api.poderes.postPoder(poder, nivelPoder, idPersonagem)
}

export const deletarPoder = async (id: number): Promise<void> => {
  await window.api.poderes.deletePoder(id)
}
