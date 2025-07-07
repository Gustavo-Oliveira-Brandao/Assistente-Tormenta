import { IModificador } from './IModificador'

export type IEfeito = {
  id: number
  nome: string
  estaAtivo: boolean
  modificadores: IModificador[]
}
