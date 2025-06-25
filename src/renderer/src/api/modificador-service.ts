import { IModificador } from '@renderer/@types/T20 GOTY/IModificador'

export const criarModificador = async (
  modificador: Partial<IModificador>,
  _idPersonagem: number
): Promise<void> => {
  await window.api.modificadores.postModificador(modificador, _idPersonagem)
}

export const atualizarModificador = async (modificador: IModificador): Promise<void> => {
  await window.api.modificadores.putModificador(modificador)
}

export const deletarModificador = async (id: number): Promise<void> => {
  await window.api.modificadores.deleteModificador(id)
}
