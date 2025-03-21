import { IAtributo } from '@renderer/@types/t20/Atributo'

export const atualizarAtributo = async (atributo: IAtributo): Promise<void> => {
  await window.api.putAtributo(atributo)
}
