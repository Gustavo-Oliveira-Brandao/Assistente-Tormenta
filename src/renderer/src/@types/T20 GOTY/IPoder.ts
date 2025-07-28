export type IPoder = {
  id: number
  key: string
  icone?: string
  nome: string
  tempoExecucao: string
  descricao: string
  categoria: string
  nivel: number
  fonte: string
  publicacao: string
  tags: ITag[]
}

export type ITag = {
  id: number
  label: string
}
