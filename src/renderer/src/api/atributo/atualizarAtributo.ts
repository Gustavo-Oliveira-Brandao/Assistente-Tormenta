import { Atributo } from '@renderer/@types/t20/Atributo'

export const atualizarAtributo = async (atributo: Atributo): Promise<void> => {
  await window.api.putAtributo(atributo)
}
