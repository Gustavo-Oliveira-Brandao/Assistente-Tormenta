import { IDano } from './IDano'

export type IInventario = {
  id: number
  limiteCarga?: number
  bonusLimiteCarga: number
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
  key: string
  nome: string
  descricao: string
  categoria: string
  equipado?: boolean
  proficiencia: string
  espacos: number
  alcance?: string
  preco: number
  quantidade: number
  vidaMaxima?: number
  vidaAtual?: number
  reducaoDano?: number
  empunhadura?: string
  penalidadeArmadura?: number
  publicacao: string
  material?: string
  ataque?: IAtaque
  danos?: IDano[]
  armadura?: IArmadura
  propriedades?: IPropriedade[]
}

export type IAtaque = {
  id: number
  proposito: string
  bonusAcerto: number
  periciaAcerto: string
  margemCritico: number
  multiplicadorCritico: number
}

export type IArmadura = {
  id: number
  defesa: number
  bonus: number
  maxAtributoDefesa: number
}

export type IPropriedade = {
  id: number
  nome: string
  categoria: string
}

export type IResistencia = {
  atributoCD: string
  cdFixo?: number
  periciaCD: string
  bonusCD: number
}
