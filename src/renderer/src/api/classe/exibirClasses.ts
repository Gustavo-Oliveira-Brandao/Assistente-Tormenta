import { IClasseT20 } from '@renderer/@types/t20/Classe'
import axios from 'axios'

export const exibirClasses = async (): Promise<IClasseT20[]> => {
  return (await axios.get<IClasseT20[]>('./data/t20/classes/classes.json')).data
}
