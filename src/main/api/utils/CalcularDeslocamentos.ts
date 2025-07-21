import { IDeslocamentoDTO } from '../../@types/T20 GOTY/dto/IDeslocamentoDTO'
import { Deslocamento } from '../entities/Deslocamento'
import { Efeito, Modificador } from '../entities/Efeito'
import { calcularModificadores } from './CalcularModificadores'

export const calcularDeslocamentos = (
  deslocamentosBrutos: Deslocamento,
  efeitos: Efeito[],
  nivelPersonagem: number
): IDeslocamentoDTO => {
  const modificadores: Modificador[] = []

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

  const deslocamentos: IDeslocamentoDTO = {
    ...deslocamentosBrutos,
    caminhadaAtual: deslocamentosBrutos.caminhadaBase + bonusCaminhada,
    vooAtual: deslocamentosBrutos.vooBase + bonusVoo,
    natacaoAtual: deslocamentosBrutos.natacaoBase + bonusNatacao,
    escaladaAtual: deslocamentosBrutos.escaladaBase + bonusEscalada,
    escavacaoAtual: deslocamentosBrutos.escavacaoBase + bonusEscavacao
  }

  return deslocamentos
}
