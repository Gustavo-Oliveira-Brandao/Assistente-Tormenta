import { IMagia } from '@renderer/@types/t20/Magia'
import axios from 'axios'

export const exibirLojaMagias = async (): Promise<IMagia[]> => {
  return (await axios.get<IMagia[]>('./data/t20/magias/magias.json')).data
}
