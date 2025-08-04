export type IStatus = {
  id: number

  // Pontos de Vida (PV)
  vidaAtual: number
  vidaTemporaria: number
  vidaMaximaBonus: number
  atributoVidaMaxima: string

  // Pontos de Mana (PM)
  manaAtual: number
  manaTemporaria: number
  manaMaximaBonus: number
  atributoManaMaxima: string

  // Defesa
  defesaBase: number
  defesaBonus: number
  atributoDefesa: string
}
