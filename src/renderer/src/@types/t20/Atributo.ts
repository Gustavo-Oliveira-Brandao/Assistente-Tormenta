import { IBonus } from './Bonus'

export interface IAtributo {
  id: number
  nome: string
  valor: number
  valorAtual: number
  descricao: string
  racial: number
  bonus: IBonus[]
  ordem: number
}
