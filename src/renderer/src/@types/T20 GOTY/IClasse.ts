import { DeepPartial } from 'typeorm'
import { IPoder } from './IPoder'
import { IProgressao } from './IProgressao'

export type IClasse = {
  key: number
  nome: string
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  progressaoConjuracao: string
  progressao: IProgressao[]
  poderesClasse: DeepPartial<IPoder[]>
  pericias: string[]
  numeroPericiasExtras: number
  periciasExtras: string[]
  proficiencias: {
    categoria: string
    nome: string
  }[]
}
