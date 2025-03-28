import { IBonus } from './Bonus'

export interface IAtributo {
  id: number
  nome: string
  valor: number
  bonus: IBonus[]
  ordem: number
}
