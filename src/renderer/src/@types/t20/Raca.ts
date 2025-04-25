export interface IRacaT20 {
  id: number
  nome: string
  descricao: string
  atributos: {
    atributo: string
    valor: number
  }[]
  tipoCriatura: string
  tamanho: string
  deslocamentos: {
    tipo: string
    valor: number
  }[]
}
