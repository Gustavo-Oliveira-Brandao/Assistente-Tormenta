import { IEfeito } from '@renderer/@types/T20 GOTY/IEfeito'
import { DeepPartial } from 'typeorm'

export const criarEfeito = async (
  efeito: DeepPartial<IEfeito>,
  _idPersonagem: number
): Promise<void> => {
  await window.api.efeitos.postEfeito(efeito, _idPersonagem)
}

export const atualizarEfeito = async (efeito: IEfeito): Promise<void> => {
  await window.api.efeitos.putEfeito(efeito)
}

export const deletarEfeito = async (id: number): Promise<void> => {
  await window.api.efeitos.deleteEfeito(id)
}
