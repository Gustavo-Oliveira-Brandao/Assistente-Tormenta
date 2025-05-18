import { IBonus } from './IBonus'

export type IDeslocamento = {
  id: number
  nome: string
  valorBase: number
  bonus: IBonus[]
}
