import { IBonus } from './Bonus'

export interface IDano {
  id: number
  quantidade: number
  dado: number
  tipo: string
  aplicaModificador: boolean
  atributo: string
  bonus: IBonus[]
}
