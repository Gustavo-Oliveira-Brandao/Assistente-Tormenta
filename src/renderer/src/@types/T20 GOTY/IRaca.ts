export type IRacaPersonagem = {
  id: number
  key: string
  nome: string
  tipo: string
  descricao: string
  racaAtributos: IRacaAtributo[]
}

export type IRacaAtributo = {
  id: number
  atributo: string
  valor: number
}
