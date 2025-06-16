export type IPoderDTO = {
  key: number
  nivel: number
  categoria: string
}

export type IPoderPersonagem = {
  id: number
  key: number
  nome: string
  tempoExecucao: string
  descricao: string
  categoria: string
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
