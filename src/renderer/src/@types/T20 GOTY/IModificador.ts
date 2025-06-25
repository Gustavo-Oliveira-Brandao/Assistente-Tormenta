export type IModificador = {
  id: number
  alvo: string
  seletor: string
  modoBonus: 'SOMA' | 'SUBSTITUICAO'
  valor: number
  estaAtivo: boolean
  ehPorNivel: boolean
}
