import { IRacaT20 } from '@renderer/@types/t20/Raca'
import axios from 'axios'

export const exibirRacas = async (): Promise<IRacaT20[]> => {
  return (await axios.get<IRacaT20[]>('./data/t20/racas/racas.json')).data
}
