import { IPoder } from './IPoder'
import { IProgressao } from './IProgressao'

export type IClasse = {
  id: number
  nome: string
  nivel: number
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  progressaoConjuracao: string
  progressao: IProgressao[]
  poderesClasse: IPoder[]
}
