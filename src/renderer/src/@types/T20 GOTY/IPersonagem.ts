import { IAtributo } from './IAtributo'
import { IDeslocamento } from './IDeslocamento'
import { IGrimorio } from './IGrimorio'
import { IPericia } from './IPericia'
import { IProficiencia } from './IProficiencia'
import { INivel } from './INivel'
import { IRecurso } from './IRecurso'

export type IPersonagem = {
  id: number
  nome: string
  tipo: string
  idade?: number
  altura?: string
  peso?: string
  raca: string
  classe: string
  origem: string
  divindade: string
  nivelAtual: number
  experiencia: number
  tamanho: string
  alinhamentoEtico: string
  alinhamentoMoral: string
  atributos: IAtributo[]
  pericias: IPericia[]
  deslocamentos: IDeslocamento[]
  recursos: IRecurso[]
  proficiencias?: IProficiencia[]
  niveis?: INivel[]
  grimorios?: IGrimorio[]
}
