import { tag } from './tag'

export interface Poder {
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
  tags: tag[]
}
