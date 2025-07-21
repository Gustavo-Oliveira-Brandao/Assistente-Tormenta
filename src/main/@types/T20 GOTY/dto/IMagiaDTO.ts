import { Magia } from '../../../api/entities/Magia'

export type IGrimorioDTO = {
  id: number
  atributoChaveMagias: string
  bonusCD: number
  cdMagias: number
  magias: Magia[]
}
