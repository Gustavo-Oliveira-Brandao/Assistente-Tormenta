import { IEquipamento } from './IInventario'
import { IPoder } from './IPoder'
import { IMagia } from './IMagia'
import { DeepPartial } from '../DeepPartial'

export type ICompendio = {
  classes: IClasse[]
  divindades: IDivindade[]
  origens: IOrigem[]
  racas: IRaca[]
  equipamentos: DeepPartial<IEquipamento>[]
  poderes: DeepPartial<IPoder>[]
  magias: DeepPartial<IMagia>[]
  pericias: IPericiaCompendio[]
  atributos: IAtributoCompendio[]
}

export type IPericiaCompendio = {
  key: string
  nome: string
  categoria: string
  atributo: string
  requerTreinamento: boolean
  sofrePenalidadeArmadura: string
  descricao: string
}

export type IAtributoCompendio = {
  nome: string
  key: string
  descricao: string
}

export type IClasse = {
  key: string
  nome: string
  icone: string
  devotoFiel: boolean
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  pericias: string[]
  numeroPericiasExtras: number
  periciasExtras: string[]
  habilidades: {
    key: string
    nivel: number
  }[]
  proficiencias: {
    categoria: string
    nome: string
  }[]
  publicacao: string
}

export type IDivindade = {
  key: string
  nome: string
  crencas: string
  simbolo: string
  canalizarEnergia: string
  armaPreferida: string
  publicacao: string
  devotos: string
  obrigacoes: string
  poderesConcedidos: string
  descricao: string
}

export type IOrigem = {
  key: string
  nome: string
  descricao: string
  publicacao: string
  itens: string
  beneficios: string
  poderes: string[]
  pericias: string[]
  beneficioPericias: {
    pericia: string
    ehOficio: boolean
  }[]
}

export type IRaca = {
  key: string
  nome: string
  icone: string
  descricao: string
  atributos: {
    atributo: string
    valor: number
  }[]
  herancas: {
    nome: string
  }[]
  deslocamentos: {
    caminhada: number
    voo: number
    escalada: number
    escavacao: number
    natacao: number
    plana: boolean
  }
  tamanho: string
  tipo: string
  publicacao: string
}
