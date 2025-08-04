export type IEfeito = {
  id: number
  nome: string
  estaAtivo: boolean
  fonte: string
  modificadores: IModificador[]
}

export type IModificador = {
  id: number
  tipo: string
  alvo: string
  valor: number
  modoBonus: string
  estaAtivo: boolean
  escalonamento: string
}
