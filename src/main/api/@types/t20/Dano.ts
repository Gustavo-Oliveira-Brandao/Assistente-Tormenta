import { IBonus } from './Bonus'

export interface IDano {
  id: number
  quantidade: number
  dado: number
  tipo: string
  atributo: string
  bonus: IBonus[]
}
