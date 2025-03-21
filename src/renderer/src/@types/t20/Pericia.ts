import { IBonus } from './Bonus'

export interface IPericia {
  id: number
  nome: string
  valor: number
  treinamento: string
  categoria: string
  atributo: string
  requerTreinamento: boolean
  sofrePenalidadeArmadura: boolean
  bonus: IBonus[]
  descricao: string
}
