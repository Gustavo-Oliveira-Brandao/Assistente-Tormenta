import { IAprimoramentoMagia } from './AprimoramentoMagia'
import { IDano } from './Dano'

export interface IMagia {
  id: number
  key?: number
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
  danos?: IDano[]
  aprimoramentos: IAprimoramentoMagia[]
}
