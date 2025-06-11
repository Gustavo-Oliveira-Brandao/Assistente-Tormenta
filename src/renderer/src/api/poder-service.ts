import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { DeepPartial } from 'typeorm'

export const exibirPoderesDefault = async (): Promise<DeepPartial<IPoder[]>> => {
  const poderes = await window.api.poder.getPoderesDefault()
  return poderes
}

export const criarPoder = async (poder: DeepPartial<IPoder>, nivel: number): Promise<void> => {
  console.log(nivel)
  await window.api.poder.postPoder(poder, nivel)
}

export const deletarPoder = async (id: number): Promise<void> => {
  await window.api.poder.deletePoder(id)
}
