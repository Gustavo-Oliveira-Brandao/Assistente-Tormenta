import { ITag } from './Tag'

export interface IPoder {
  id: number
  nome: string
  iconeURL: string
  tempoExecucao: string
  descricao: string
  categoria: string
  preRequisitos: string
  topicos: {
    titulo: string
    texto: string
  }[]
  tags: ITag[]
}
