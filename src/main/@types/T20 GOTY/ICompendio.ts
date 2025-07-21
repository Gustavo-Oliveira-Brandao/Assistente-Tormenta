import { DeepPartial } from 'typeorm'
import { Equipamento } from '../../api/entities/Inventario'
import { Poder } from '../../api/entities/Poder'
import { Magia } from '../../api/entities/Magia'

export type ICompendio = {
  classes: IClasse[]
  divindades: IDivindade[]
  origens: IOrigem[]
  racas: IRaca[]
  equipamentos: DeepPartial<Equipamento>[]
  poderes: DeepPartial<Poder>[]
  magias: DeepPartial<Magia>[]
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
    natacao: number
    plana: boolean
  }
  tamanho: string
  tipo: string
  publicacao: string
}
