import { IAtributo } from './IAtributo'
import { IClassePersonagem } from './IClasse'
import { IDeslocamento } from './IDeslocamento'
import { IGrimorio } from './IGrimorio'
import { IPericia } from './IPericia'
import { IPoderPersonagem } from './IPoder'
import { IProficiencia } from './IProficiencia'
import { IRecurso } from './IRecurso'

export type IPersonagem = {
  id: number
  nome: string
  tipo: string
  idade?: number
  altura?: string
  peso?: string
  raca: string
  classeInicial: string
  origem: string
  divindade: string
  nivelAtual?: number
  experiencia: number
  tamanho: string
  alinhamentoEtico: string
  alinhamentoMoral: string
  atributos: IAtributo[]
  pericias: IPericia[]
  deslocamentos: IDeslocamento[]
  recursos: IRecurso[]
  proficiencias?: IProficiencia[]
  classes: IClassePersonagem[]
  grimorios?: IGrimorio[]
  poderes?: IPoderPersonagem[]
}
