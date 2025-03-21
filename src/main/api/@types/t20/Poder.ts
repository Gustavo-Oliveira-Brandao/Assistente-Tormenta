import { ITag } from './Tag'
import { IExtra } from './Extra'

export interface IPoder {
  id: number
  nome: string
  iconeURL: string
  tempoExecucao: string
  descricao: string
  categoria: string
  preRequisitos: string
  extras: IExtra[]
  tags: ITag[]
}
