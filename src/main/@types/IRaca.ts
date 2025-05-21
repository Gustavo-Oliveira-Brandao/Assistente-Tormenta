import { Poder } from '../api/entities/Poder'

export type IRaca = {
  key: number
  nome: string
  descricao: string
  atributos: {
    atributo: string
    valor: number
  }[]
  poderes: Partial<Poder[]>
}
