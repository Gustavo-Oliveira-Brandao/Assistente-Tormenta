export type IRaca = {
  key: number
  nome: string
  icone: string
  descricao: string
  atributos: {
    atributo: string
    valor: number
  }[]
  herancas: {
    nome: string
  }[]
  deslocamentos: {
    caminhada: number
    voo: number
    escalada: number
    natacao: number
    plana: boolean
  }
  tamanho: string
  tipo: string
}
