import { IBonus } from './Bonus'

export interface IDefesa {
  id: number
  armadura: number
  escudo: number
  bonus: IBonus[]
  temporario: number
  atributo: string
  penalidadeArmaduraTotal: number
}
