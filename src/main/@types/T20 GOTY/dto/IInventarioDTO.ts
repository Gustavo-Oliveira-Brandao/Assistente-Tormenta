import { Equipamento } from '../../../api/entities/Inventario'

export type IInventarioDTO = {
  id: number
  limiteCarga: number
  bonusLimiteCarga: number
  cargaAtual: number
  limiteItensVestidos: number
  limiteCargaEstaAtivo: boolean
  limiteItensVestidosEstaAtivo: boolean
  tibarCobre: number
  tibarOuro: number
  tibar: number
  itens: Equipamento[]
}
