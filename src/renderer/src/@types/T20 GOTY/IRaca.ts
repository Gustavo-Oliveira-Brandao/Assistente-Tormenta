import { IPoder } from './IPoder'

export type IRaca = {
  key: number
  nome: string
  descricao: string
  atributos: {
    atributo: string
    valor: number
  }[]
  poderes: IPoder[]
}
