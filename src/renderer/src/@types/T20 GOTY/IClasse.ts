export type IClasse = {
  key: string
  nome: string
  icone: string
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  devotoFiel: boolean
  pericias: string[]
  numeroPericiasExtras: number
  periciasExtras: string[]
  proficiencias: {
    categoria: string
    nome: string
  }[]
}

export type IClassePersonagem = {
  id: number
  nome: string
  nivel: number
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  devotoFiel: boolean
}
