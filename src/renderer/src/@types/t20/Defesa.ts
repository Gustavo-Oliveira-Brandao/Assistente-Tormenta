import { IBonus } from './Bonus'

export interface IDefesa {
  id: number
  valorAtual: number
  armadura: number
  escudo: number
  temporario: number
  atributo: string
  penalidadeArmaduraTotal: number
  bonus: IBonus[]
}
