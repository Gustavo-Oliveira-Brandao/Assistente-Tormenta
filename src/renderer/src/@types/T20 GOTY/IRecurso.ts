import { IBonus } from './IBonus'

export type IRecurso = {
  id: number
  categoria: string
  valorMaximo?: number
  valorAtual: number
  valorTemporario?: number
  atributo: string | null
  bonus: IBonus[]
}
