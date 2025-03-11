import { IAprimoramentoMagia } from './AprimoramentoMagia'
import { IDano } from './Dano'

export interface IMagia {
  id: number
  nome: string
  iconeURL: string
  alvoAreaEfeito: string
  execucao: string
  testeResistencia: string
  descricao: string
  duracao: string
  nivelCirculo: number
  alcance: string
  tradição: string
  escola: string
  danos?: IDano[]
  aprimoramentos?: IAprimoramentoMagia[]
}
