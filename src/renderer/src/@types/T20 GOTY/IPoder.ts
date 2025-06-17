export type IPoderDTO = {
  key: string
  nivel: number
  categoria: string
}

export type IPoderPersonagem = {
  id: number
  key: string
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
