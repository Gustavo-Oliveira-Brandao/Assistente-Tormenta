import { IAtributo } from './IAtributo'
import { IClassePersonagem } from './IClasse'
import { IDeslocamento } from './IDeslocamento'
import { IModificador } from './IModificador'
import { IPericia } from './IPericia'
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
  classes: IClassePersonagem[]
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
  modificadores: IModificador[]
}
