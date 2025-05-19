import { ISubEfeito } from './ISubEfeito'
import { ITag } from './ITag'

export type IPoder = {
  id: number
  nome: string
  tempoExecucao: string
  descricao: string
  categoria: string
  preRequisitos: string
  subEfeitos: ISubEfeito[]
  tags: ITag[]
}
