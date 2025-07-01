export type IStatus = {
  id: number

  // Pontos de Vida (PV)
  vidaMaxima?: number
  vidaAtual: number
  vidaTemporaria: number
  atributoVidaMaxima: string

  // Pontos de Mana (PM)
  manaMaxima?: number
  manaAtual: number
  manaTemporario: number
  atributoManaMaxima: string

  // Defesa
  defesaBase: number
  defesaAtual?: number
  atributoDefesa: string
}
