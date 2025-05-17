import { IBonus } from './IBonus'
import { IMagia } from './IMagia'

export type IGrimorio = {
  id: number
  tradicao: string
  atributoChave: string
  cd?: number
  bonusCD: IBonus[]
  magias: IMagia[]
}
