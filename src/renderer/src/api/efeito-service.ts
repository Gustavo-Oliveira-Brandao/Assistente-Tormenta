import { DeepPartial } from '@renderer/@types/DeepPartial'
import { IEfeito } from '@renderer/@types/T20 GOTY/IEfeito'

export const criarEfeito = async (
  efeito: DeepPartial<IEfeito>,
  _idPersonagem: number
): Promise<void> => {
  await window.api.efeitos.postEfeito(efeito, _idPersonagem)
}

export const atualizarEfeito = async (id: number, efeito: IEfeito): Promise<void> => {
  await window.api.efeitos.putEfeito(id, efeito)
}

export const deletarEfeito = async (id: number): Promise<void> => {
  await window.api.efeitos.deleteEfeito(id)
}
