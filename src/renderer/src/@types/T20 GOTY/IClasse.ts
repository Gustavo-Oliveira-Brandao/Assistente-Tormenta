export type IClassePersonagem = {
  id: number
  nome: string
  nivel: number
  descricao: string
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  devotoFiel: boolean
  habilidades: IClasseHabilidade[]
}

export type IClasseHabilidade = {
  id: number
  key: string
  nivel: number
}
