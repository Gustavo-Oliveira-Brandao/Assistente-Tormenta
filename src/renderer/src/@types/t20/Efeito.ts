import { Modificador } from './Modificador'

export interface Efeito {
  id: number
  nome: string
  descricao: string
  estaAtivo: boolean
  modificadores: Modificador[]
}
