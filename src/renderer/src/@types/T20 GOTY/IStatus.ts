export type IStatus = {
  id: number

  // Pontos de Vida (PV)
  vidaMaxima?: number
  vidaAtual: number
  vidaTemporaria: number
  vidaMaximaBonus: number
  atributoVidaMaxima: string

  // Pontos de Mana (PM)
  manaMaxima?: number
  manaAtual: number
  manaTemporaria: number
  manaMaximaBonus: number
  atributoManaMaxima: string

  // Defesa
  defesaBase: number
  defesaAtual?: number
  defesaBonus: number
  atributoDefesa: string
}
