export interface IRecurso {
  id: number
  valorAtual: number
  valorMaximo: number
  valorTemporario: number
  valorPorNivel: number
  valorBase: number
  atributo: string
  limitePM?: number
}
