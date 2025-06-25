export type IModificador = {
  id: number
  nome: string
  tipo: string
  alvo: string
  seletor: string
  modoBonus: 'SOMA' | 'SUBSTITUICAO'
  valor: number
  estaAtivo: boolean
  ehPorNivel: boolean
}
