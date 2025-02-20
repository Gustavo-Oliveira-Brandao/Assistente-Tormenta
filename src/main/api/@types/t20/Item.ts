import { IDano } from './Dano'

export interface IItemInventario {
  id: number
  nome: string
  preco: number
  categoria: string
  subCategoria: string
  descricao: string
  espacos: number
  quantidade: number
  margemCritico?: number
  multiplicadorCritico?: number
  alcance?: string
  danos?: IDano[]
  bonusDefesa?: number
  penalidadeArmadura?: number
}
