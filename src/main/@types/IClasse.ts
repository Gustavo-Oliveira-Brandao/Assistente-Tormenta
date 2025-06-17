export type IClasse = {
  key: number
  nome: string
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  progressaoConjuracao: string
  pericias: string[]
  numeroPericiasExtras: number
  periciasExtras: string[]
  proficiencias: {
    categoria: string
    nome: string
  }[]
}
