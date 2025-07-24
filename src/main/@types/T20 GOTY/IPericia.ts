export type IPericia = {
  id: number
  nome: string
  bonus: number
  ehTreinado: boolean
  key: string
  categoria: string
  atributo: string
  requerTreinamento: boolean
  sofrePenalidadeArmadura: boolean
}

export type IPericiaCalculada = {
  id: number
  nome: string
  valorAtual: number
  bonus: number
  ehTreinado: boolean
  categoria: string
  key: string
  atributo: string
  requerTreinamento: boolean
  sofrePenalidadeArmadura: boolean
}
