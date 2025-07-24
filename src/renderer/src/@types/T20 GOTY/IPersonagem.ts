import { IAtributo } from './IAtributo'
import { IClassePersonagem } from './IClasse'
import { IDeslocamento } from './IDeslocamento'
import { IEfeito } from './IEfeito'
import { IPericia } from './IPericia'
import { IProficiencia } from './IProficiencia'
import { IRacaPersonagem } from './IRaca'
import { IStatus } from './IStatus'

export type IPersonagem = {
  id: number
  nome: string
  categoria: string
  nivel: number
  tamanho: string
  classeOriginal: string
  origem: string
  divindade: string
  experiencia: number
  alinhamentoEtico: string
  alinhamentoMoral: string
  raca: IRacaPersonagem
  classes: IClassePersonagem[]
  atributos: IAtributo[]
  pericias: IPericia[]
  status: IStatus
  deslocamentos: IDeslocamento
  efeitos: IEfeito[]
  proficiencias: IProficiencia[]
}
