import { IBonus } from './Bonus'

export interface IRecurso {
  id: number
  categoria: string
  valorAtual: number
  valorTemporario: number
  atributo: string
  limitePM?: number
  bonus: IBonus[]
}
