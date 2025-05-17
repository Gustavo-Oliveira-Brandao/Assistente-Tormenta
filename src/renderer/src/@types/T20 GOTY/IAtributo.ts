import { IBonus } from './IBonus'

export type IAtributo = {
  id: number
  nome: string
  valorBase: number
  valorAtual: number
  bonus: IBonus[]
  ordem: number
}
