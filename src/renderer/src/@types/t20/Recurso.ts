import { IBonus } from './Bonus'

export interface IRecurso {
  id: number
  categoria: string
  valorAtual: number
  valorMaximo: number
  valorTemporario: number
  atributo: string
  limitePM?: number
  bonus: IBonus[]
}
