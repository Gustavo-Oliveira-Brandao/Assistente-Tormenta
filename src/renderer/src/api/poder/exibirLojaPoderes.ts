import { IPoder } from '@renderer/@types/t20/Poder'
import axios from 'axios'

export const exibirLojaPoderes = async (): Promise<IPoder[]> => {
  return (await axios.get<IPoder[]>('./data/t20/poderes/poderes.json')).data
}
