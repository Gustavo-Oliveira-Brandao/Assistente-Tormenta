import { IPoderDB } from './IPoder'

export type IClasse = {
  key: number
  nome: string
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  progressaoConjuracao: string
  poderes: IPoderDB[]
  poderesClasse: IPoderDB[]
  pericias: string[]
  numeroPericiasExtras: number
  periciasExtras: string[]
  proficiencias: {
    categoria: string
    nome: string
  }[]
}

export type IClassePersonagem = {
  id: number
  nome: string
  nivel: number
}
