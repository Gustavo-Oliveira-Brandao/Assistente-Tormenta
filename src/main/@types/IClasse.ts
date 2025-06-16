import { DeepPartial } from 'typeorm'
import { Poder } from '../api/entities/Poder'

export type IClasse = {
  key: number
  nome: string
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  progressaoConjuracao: string
  poderes: DeepPartial<Poder>[]
  poderesClasse: DeepPartial<Poder>[]
  pericias: string[]
  numeroPericiasExtras: number
  periciasExtras: string[]
  proficiencias: {
    categoria: string
    nome: string
  }[]
}
