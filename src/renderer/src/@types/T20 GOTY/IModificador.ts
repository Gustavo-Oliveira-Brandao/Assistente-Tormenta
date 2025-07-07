export type IModificador = {
  id: number
  tipo: string
  alvo: string
  modoBonus: 'SOMA' | 'SUBSTITUICAO'
  valor: number
  estaAtivo: boolean
  ehPorNivel: boolean
}
