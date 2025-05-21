import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'

export const atualizarAtributo = async (atributo: IAtributo): Promise<void> => {
  await window.api.atributo.putAtributo(atributo)
}
