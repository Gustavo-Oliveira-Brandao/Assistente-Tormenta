import { IPoder } from './IPoder'
import { IProficiencia } from './IProficiencia'
import { IProgressao } from './IProgressao'

export type IClasse = {
  id: number
  key?: number
  nome: string
  nivel?: number
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  ehPrincipal: true
  progressaoConjuracao: string
  progressao: IProgressao[]
  poderesClasse: IPoder[]
  pericias?: string[]
  numeroEscolhasPericias?: number
  periciasEscolhiveis?: string[]
  proficiencias?: IProficiencia[]
}
