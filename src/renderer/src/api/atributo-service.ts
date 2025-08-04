import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'

export const atualizarAtributo = async (id: number, atributo: IAtributo): Promise<void> => {
  await window.api.atributos.putAtributo(id, atributo)
}
