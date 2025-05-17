import { IBonus } from './IBonus'

export type IDano = {
  id: number
  quantidade: number
  dado: number
  tipo: string
  aplicaModificador: boolean
  atributo: string
  bonus: IBonus[]
}
