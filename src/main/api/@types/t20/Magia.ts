import { IAprimoramentoMagia } from './AprimoramentoMagia'

export interface IMagia {
  id: number
  nome: string
  iconeURL: string
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
