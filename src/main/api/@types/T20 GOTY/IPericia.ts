import { IBonus } from './IBonus'

export type IPericia = {
  id: number
  nome: string
  treinamento: string
  categoria: string
  atributo: string
  requerTreinamento: boolean
  sofrePenalidadeArmadura: boolean
  bonus: IBonus[]
}
