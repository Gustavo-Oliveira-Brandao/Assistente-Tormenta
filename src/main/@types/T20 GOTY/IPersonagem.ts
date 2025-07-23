import { IAtributo } from './IAtributo'
import { IClassePersonagem } from './IClasse'
import { IDeslocamento } from './IDeslocamento'
import { IEfeito } from './IEfeito'
import { IPericia } from './IPericia'
import { IStatus } from './IStatus'

export type IPersonagemJogador = {
  id: number
  nome: string
  categoria: string
  tipo: string
  nivel: number
  tamanho: string
  detalhesPJ: IDetalhesPJ
  classes: IClassePersonagem[]
  atributos: IAtributo[]
  pericias: IPericia[]
  deslocamentos: IDeslocamento
  status: IStatus
  efeitos: IEfeito[]
}

export type IDetalhesPJ = {
  id: number
  raca: string
  classeOriginal: string
  origem: string
  divindade: string
  experiencia: number
  alinhamentoEtico: string
  alinhamentoMoral: string
}

export type IDetalhesAmeaca = {
  id: number
  papelCombate: string
  subTipo?: string
  tesouro?: string
}
