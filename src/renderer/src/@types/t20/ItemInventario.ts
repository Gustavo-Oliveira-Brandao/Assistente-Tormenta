import { Dano } from './Dano'
import { PropriedadeItem } from './PropriedadeItem'

export interface ItemInventario {
  id: number
  nome: string
  descricao: string
  categoria: string
  icone: string
  preco: number
  espacos: number
  quantidade: number
  grupo: string
  alcance?: string
  bonusAcerto?: number
  margemCritico?: number
  multiplicadorCritico?: number
  danos?: Dano[]
  penalidadeArmadura?: number
  propriedades?: PropriedadeItem[]
}
