import { IPericia } from '@renderer/@types/t20/Pericia'
import axios from 'axios'

export const exibirPericiasDefault = async (): Promise<IPericia[]> => {
  const pericias = (await axios.get<IPericia[]>('./data/t20/pericias/pericias.json')).data
  return pericias
}
