import { IBonus } from './Bonus'

export interface IRecurso {
  id: number
  valorAtual: number
  valorTemporario: number
  atributo: string
  limitePM?: number
  bonus: IBonus[]
}
