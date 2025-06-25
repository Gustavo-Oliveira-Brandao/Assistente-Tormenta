import { IMagiaPersonagem } from './IMagia'

export type IGrimorio = {
  id: number
  nome: string
  tradicao: string
  atributoChave: string
  cd?: number
  magias: IMagiaPersonagem[]
}
