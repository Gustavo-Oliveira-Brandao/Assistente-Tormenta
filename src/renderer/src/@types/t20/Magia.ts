import { Dano } from './Dano'

export interface Magia {
  id: number
  nome: string
  icone: string
  area: string
  execucao: string
  testeResistencia: string
  descricao: string
  duracao: string
  nivelCirculo: number
  alcance: string
  alvo: string
  tradição: string
  escola: string
  danos?: Dano[]
}
