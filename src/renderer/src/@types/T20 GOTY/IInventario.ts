import { IDano } from './IDano'

export type IInventario = {
  id: number
  limiteCarga?: number
  cargaAtual?: number
  limiteItensVestidos: number
  limiteCargaEstaAtivo: boolean
  limiteItensVestidosEstaAtivo: boolean
  tibarCobre: number
  tibarOuro: number
  tibar: number
  itens: IEquipamento[]
}

export type IEquipamento = {
  id: number
  nome: string
  descricao?: string
  categoria: string
  carregado: boolean
  equipado?: boolean
  proficiencia?: string
  espacos: number
  preco: number
  quantidade: number
  vidaMaxima?: number
  vidaAtual?: number
  reducaoDano?: number
  empunhadura?: string
  penalidadeArmadura?: number
  publicacao?: string
  material?: string
  arma?: IArma
  armadura?: IArmadura
  propriedades?: IPropriedade[]
}

export type IArma = {
  alcance: string
  proposito: string
  recarga?: string
  bonusAcerto: number
  periciaAcerto: string
  danos: IDano[]
  margemCritico: number
  multiplicadorCritico: number
}

export type IArmadura = {
  bonusDefesa?: number
  maxAtributoDefesa?: number
}

export type IPropriedade = {
  id: number
  nome: string
  categoria: string
}
