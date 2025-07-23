import { IMagia } from '../IMagia'

export type IGrimorioResponseDTO = {
  id: number
  atributoChaveMagias: string
  bonusCD: number
  cdMagias: number
  magias: IMagia[]
}

export type IMagiaRequestDTO = {
  key: string
  nome: string
  alvo: string
  area: string
  efeito: string
  execucao: string
  resistencia: string
  descricao: string
  duracao: string
  nivelCirculo: number
  alcance: string
  tradicao: string
  publicacao: string
  escola: string
  aprimoramentos: IAprimoramentoMagiaRequestDTO[]
}

export type IAprimoramentoMagiaRequestDTO = {
  custo: number
  descricao: string
}
