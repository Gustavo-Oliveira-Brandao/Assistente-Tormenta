import { ISubEfeito } from './ISubEfeito'
import { ITag } from './ITag'

export type IPoderDB = {
  key: number
  nome: string
  tempoExecucao: string
  descricao: string
  categoria: string
  nivel?: number
  preRequisitos: string
  subEfeitos: ISubEfeito[]
  tags: ITag[]
}
