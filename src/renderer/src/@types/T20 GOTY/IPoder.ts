export type IPoderPersonagem = {
  id: number
  key: string
  icone?: string
  nome: string
  tempoExecucao: string
  descricao: string
  categoria: string
  fonte: string
  publicacao: string
  nivel: number
  preRequisitos: string
  subEfeitos: ISubEfeito[]
  tags: ITag[]
}

export type ITag = {
  id: number
  label: string
}

export type ISubEfeito = {
  id: number
  nome: string
  descricao: string
}
