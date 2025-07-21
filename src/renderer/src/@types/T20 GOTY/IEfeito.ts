import { IModificador } from './IModificador'

export type IEfeito = {
  id: number
  nome: string
  estaAtivo: boolean
  fonte: string
  modificadores: IModificador[]
}
