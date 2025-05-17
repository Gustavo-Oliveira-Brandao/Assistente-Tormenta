import { IBonus } from './IBonus'

export type IPericia = {
  id: number
  nome: string
  valorAtual: number
  treinamento: string
  categoria: string
  atributo: string
  requerTreinamento: boolean
  sofrePenalidadeArmadura: boolean
  bonus: IBonus[]
}
