import { IBonus } from './Bonus'

export interface IAtributo {
  id: number
  nome: string
  valor: number
  valorAtual: number
  racial: number
  descricao: string
  bonus: IBonus[]
  ordem: number
}
