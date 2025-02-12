import { ITag } from './Tag'
import { ITopico } from './Topico'

export interface IPoder {
  id: number
  nome: string
  iconeURL: string
  tempoExecucao: string
  descricao: string
  categoria: string
  preRequisitos: string
  topicos: ITopico[]
  tags: ITag[]
}
