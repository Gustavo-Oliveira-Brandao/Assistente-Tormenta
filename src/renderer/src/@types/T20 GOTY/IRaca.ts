import { DeepPartial } from 'typeorm'
import { IPoder } from './IPoder'

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
    poderes: DeepPartial<IPoder[]>
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
  poderes: DeepPartial<IPoder[]>
}
