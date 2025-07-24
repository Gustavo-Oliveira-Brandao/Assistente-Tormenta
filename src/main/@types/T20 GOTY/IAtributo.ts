export type IAtributo = {
  id: number
  nome: string
  key: string
  descricao: string
  valorBase: number
  bonus: number
}

export type IAtributoCalculado = {
  id: number
  nome: string
  key: string
  descricao: string
  valorBase: number
  valorAtual: number
  bonus: number
}
