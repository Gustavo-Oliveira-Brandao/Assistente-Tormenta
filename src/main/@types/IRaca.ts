import { DeepPartial } from 'typeorm'
import { Poder } from '../api/entities/Poder'

export type IRaca = {
  key: number
  nome: string
  descricao: string
  atributos: {
    atributo: string
    valor: number
  }[]
  herancas: {
    nome: string
    poderes: DeepPartial<Poder>[]
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
  poderes: DeepPartial<Poder>[]
}
