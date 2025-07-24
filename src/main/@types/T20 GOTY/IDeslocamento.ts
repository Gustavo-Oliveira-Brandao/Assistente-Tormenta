export type IDeslocamento = {
  id: number
  caminhadaBase: number
  vooBase: number
  natacaoBase: number
  escaladaBase: number
  escavacaoBase: number
  plana: boolean
}

export type IDeslocamentoCalculado = {
  id: number
  caminhadaBase: number
  caminhadaAtual: number
  vooBase: number
  vooAtual: number
  natacaoBase: number
  natacaoAtual: number
  escaladaBase: number
  escaladaAtual: number
  escavacaoBase: number
  escavacaoAtual: number
  plana: boolean
}
