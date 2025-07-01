import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'

export const atualizarAtributo = async (atributo: IAtributo): Promise<void> => {
  await window.api.atributos.putAtributo(atributo)
}

export const exibirAtributosPersonagem = async (_idPersonagem: number): Promise<IAtributo[]> => {
  const atributos = await window.api.atributos.getAtributosPersonagem(_idPersonagem)
  return atributos
}
