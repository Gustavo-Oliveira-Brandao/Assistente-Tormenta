import { IMagia } from './IMagia'

export type IGrimorio = {
  id: number
  tradicao: string
  atributoChave: string
  cd?: number
  magias: IMagia[]
}
