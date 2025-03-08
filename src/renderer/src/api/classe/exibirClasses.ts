import { ClasseT20 } from '@renderer/@types/t20/Classe'
import axios from 'axios'

export const exibirClasses = async (): Promise<ClasseT20[]> => {
  return (await axios.get<ClasseT20[]>('./data/t20/classes/classes.json')).data
}
