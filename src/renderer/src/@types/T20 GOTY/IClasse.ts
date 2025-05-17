import { IPoder } from './IPoder'
import { IProficiencia } from './IProficiencia'

export type IClasse = {
  id: number
  key?: number
  nome: string
  nivel: number
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  progressaoConjuracao: string
  progressao: {
    nivel: number
    poderes: IPoder[]
  }[]
  poderesClasse: IPoder[]
  pericias?: string[]
  numeroEscolhasPericias?: number
  periciasEscolhiveis?: string[]
  proficiencias?: IProficiencia[]
}
