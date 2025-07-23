import { IDeslocamento } from '@renderer/@types/T20 GOTY/IDeslocamento'
import { IEfeito, IModificador } from '@renderer/@types/T20 GOTY/IEfeito'
import { calcularModificadores } from './Calcular_Modificadores'

type IDeslocamentosPreCalculo = {
  id: number
  caminhadaBase: number
  vooBase: number
  natacaoBase: number
  escaladaBase: number
  escavacaoBase: number
  plana: boolean
}

export const calcularDeslocamentos = (
  deslocamentosBrutos: IDeslocamentosPreCalculo,
  efeitos: IEfeito[],
  nivelPersonagem: number
): IDeslocamento => {
  const modificadores: IModificador[] = []

  for (const efeito of efeitos) {
    for (const mod of efeito.modificadores) {
      if (mod.tipo == 'deslocamentos') {
        modificadores.push(mod)
      }
    }
  }

  const bonusCaminhada = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'caminhada'),
    nivelPersonagem
  )
  const bonusVoo = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'voo'),
    nivelPersonagem
  )
  const bonusNatacao = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'natacao'),
    nivelPersonagem
  )
  const bonusEscalada = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'escalada'),
    nivelPersonagem
  )
  const bonusEscavacao = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'escavacao'),
    nivelPersonagem
  )

  const deslocamentos: IDeslocamento = {
    ...deslocamentosBrutos,
    caminhadaAtual: deslocamentosBrutos.caminhadaBase + bonusCaminhada,
    vooAtual: deslocamentosBrutos.vooBase + bonusVoo,
    natacaoAtual: deslocamentosBrutos.natacaoBase + bonusNatacao,
    escaladaAtual: deslocamentosBrutos.escaladaBase + bonusEscalada,
    escavacaoAtual: deslocamentosBrutos.escavacaoBase + bonusEscavacao
  }

  return deslocamentos
}
