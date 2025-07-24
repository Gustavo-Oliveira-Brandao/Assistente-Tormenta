import { IDeslocamento, IDeslocamentoCalculado } from '../../@types/T20 GOTY/IDeslocamento'
import { IEfeito, IModificador } from '../../@types/T20 GOTY/IEfeito'
import { calcularModificadores } from './Calcular_Modificadores'

export const calcularDeslocamentos = (
  deslocamentosBrutos: IDeslocamento,
  efeitos: IEfeito[],
  nivelPersonagem: number
): IDeslocamentoCalculado => {
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

  const deslocamentos: IDeslocamentoCalculado = {
    ...deslocamentosBrutos,
    caminhadaAtual: deslocamentosBrutos.caminhadaBase + bonusCaminhada,
    vooAtual: deslocamentosBrutos.vooBase + bonusVoo,
    natacaoAtual: deslocamentosBrutos.natacaoBase + bonusNatacao,
    escaladaAtual: deslocamentosBrutos.escaladaBase + bonusEscalada,
    escavacaoAtual: deslocamentosBrutos.escavacaoBase + bonusEscavacao
  }

  return deslocamentos
}
