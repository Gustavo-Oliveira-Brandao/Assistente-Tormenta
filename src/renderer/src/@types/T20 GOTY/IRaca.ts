import { IPoderDB } from './IPoder'

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
    poderes: IPoderDB[]
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
  poderes: IPoderDB[]
}
