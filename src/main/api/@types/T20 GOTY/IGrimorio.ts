import { IBonus } from './IBonus'
import { IMagia } from './IMagia'

export type IGrimorio = {
  id: number
  tradicao: string
  atributoChave: string
  bonusCD?: IBonus[]
  magias?: IMagia[]
}
