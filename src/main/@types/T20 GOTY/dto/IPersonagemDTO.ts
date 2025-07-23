import { IClassePersonagem } from '../IClasse'
import { IDetalhesPJ } from '../IPersonagem'
import { IAtributoRequestDTO } from './IAtributoDTO'
import { IDeslocamentoRequestDTO } from './IDeslocamentoDTO'
import { IEfeitoRequestDTO } from './IEfeitoDTO'
import { IPericiaRequestDTO } from './IPericiaDTO'

export type IPersonagemJogadorRequestDTO = {
  id: number
  nome: string
  tipo: string
  nivel: number
  tamanho: string
  detalhesPJ: IDetalhesPJRequestDTO
  classes: IClassePersonagem[]
  atributos: IAtributoRequestDTO[]
  pericias: IPericiaRequestDTO[]
  deslocamentos: IDeslocamentoRequestDTO
  efeitos: IEfeitoRequestDTO[]
}

export type IClassePersonagemRequestDTO = {
  nome: string
  vidaInicial: number
  vidaPorNivel: number
  devotoFiel: boolean
  manaPorNivel: boolean
}

export type IDetalhesPJRequestDTO = {
  raca: string
  classeOriginal: string
  origem: string
  divindade: string
  alinhamentoEtico: string
  alinhamentoMoral: string
}

export type IPersonagemResponseManyDTO = {
  id: number
  nome: string
  tipo: string
  nivel: number
  tamanho: string
  categoria: string
  detalhesPJ: IDetalhesPJ | null
}
