import { RacaT20 } from '@renderer/@types/t20/Raca'
import axios from 'axios'

export const exibirRacas = async (): Promise<RacaT20[]> => {
  return (await axios.get<RacaT20[]>('./data/t20/racas/racas.json')).data
}
