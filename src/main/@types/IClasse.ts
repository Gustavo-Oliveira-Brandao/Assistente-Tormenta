export type IClasse = {
  key: number
  nome: string
  icone: string
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  pericias: string[]
  numeroPericiasExtras: number
  periciasExtras: string[]
  proficiencias: {
    categoria: string
    nome: string
  }[]
}
