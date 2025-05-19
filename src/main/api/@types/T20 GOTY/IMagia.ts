import { IAprimoramentoMagia } from './IAprimoramentoMagia'

export type IMagia = {
  id: number
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
  aprimoramentos?: IAprimoramentoMagia[]
}
