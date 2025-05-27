import { DeepPartial } from 'typeorm'
import { IPoder } from './IPoder'

export type IClasse = {
  key: number
  nome: string
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  progressaoConjuracao: string
  progressao: {
    nivel: number
    poderes: DeepPartial<IPoder[]>
  }[]
  poderesClasse: DeepPartial<IPoder[]>
  pericias: string[]
  numeroPericiasExtras: number
  periciasExtras: string[]
  proficiencias: {
    categoria: string
    nome: string
  }[]
}
