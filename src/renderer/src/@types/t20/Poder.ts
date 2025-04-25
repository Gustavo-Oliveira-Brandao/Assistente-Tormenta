import { ITag } from './Tag'

export interface IPoder {
  id: number
  key?: number
  nome: string
  iconeURL: string
  tempoExecucao: string
  descricao: string
  categoria: string
  preRequisitos: string
  extras: {
    titulo: string
    texto: string
  }[]
  tags: ITag[]
}
