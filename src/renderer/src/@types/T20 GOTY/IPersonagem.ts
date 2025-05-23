import { IAtributo } from './IAtributo'
import { IBonus } from './IBonus'
import { IClasse } from './IClasse'
import { IDeslocamento } from './IDeslocamento'
import { IGrimorio } from './IGrimorio'
import { IPericia } from './IPericia'
import { IPoder } from './IPoder'
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
  classes: IClasse[]
  origem: string
  divindade: string
  nivel?: number
  experiencia: number
  tamanho: string
  alinhamentoEtico: string
  alinhamentoMoral: string
  atributos: IAtributo[]
  pericias: IPericia[]
  poderes?: IPoder[]
  deslocamentos: IDeslocamento[]
  recursos: IRecurso[]
  bonusCD?: IBonus[]
  proficiencias?: IProficiencia[]
  grimorios?: IGrimorio[]
}
