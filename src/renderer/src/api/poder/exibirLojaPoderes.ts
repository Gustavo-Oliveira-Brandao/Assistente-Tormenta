import { Poder } from '@renderer/@types/t20/Poder'
import axios from 'axios'

export const exibirLojaPoderes = async (): Promise<Poder[]> => {
  return (await axios.get<Poder[]>('./data/t20/poderes/poderes.json')).data
}
