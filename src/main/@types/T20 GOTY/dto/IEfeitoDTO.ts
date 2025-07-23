export type IEfeitoRequestDTO = {
  nome: string
  estaAtivo: boolean
  fonte: string
  modificadores: IModificadorRequestDTO[]
}

export type IModificadorRequestDTO = {
  tipo: string
  alvo: string
  valor: number
  modoBonus: string
  estaAtivo: boolean
  escalonamento: string
}
