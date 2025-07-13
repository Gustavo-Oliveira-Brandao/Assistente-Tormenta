import { IAtributo } from './IAtributo'
import { IClassePersonagem } from './IClasse'
import { IDeslocamento } from './IDeslocamento'
import { IEfeito } from './IEfeito'
import { IPericia } from './IPericia'
import { IStatus } from './IStatus'

export type IPersonagem = {
  id: number
  nome: string
  tipo: string
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
  atributoChaveMagias: string
  cdMagias?: number
  atributos: IAtributo[]
  pericias: IPericia[]
  deslocamento: IDeslocamento
  status: IStatus
  efeitos: IEfeito[]
}
