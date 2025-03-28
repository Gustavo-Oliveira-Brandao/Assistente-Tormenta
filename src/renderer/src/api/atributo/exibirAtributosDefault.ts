import { IAtributo } from '@renderer/@types/t20/Atributo'
import axios from 'axios'

export const exibirAtributosDefault = async (): Promise<IAtributo[]> => {
  return (await axios.get<IAtributo[]>('./data/t20/atributos/atributos.json')).data
}
