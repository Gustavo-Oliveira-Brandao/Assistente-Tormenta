import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { IEfeito, IModificador } from '@renderer/@types/T20 GOTY/IEfeito'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { IStatus } from '@renderer/@types/T20 GOTY/IStatus'
import { calcularModificadores } from './Calcular_Modificadores'

export const calcularStatus = (
  personagem: IPersonagem,
  atributosCalculados: IAtributo[],
  efeitos: IEfeito[],
  nivelPersonagem: number
): IStatus => {
  let vidaInicial = 0
  let vidaTotalPorNivel = 0
  let manaTotalPorNivel = 0

  for (const classe of personagem.classes) {
    if (classe.nome === personagem.detalhesPJ.classeOriginal) {
      vidaInicial = classe.vidaInicial
    }
  }

  for (const classe of personagem.classes) {
    vidaTotalPorNivel += classe.vidaPorNivel
    manaTotalPorNivel += classe.manaPorNivel
  }

  const modificadores: IModificador[] = []

  for (const efeito of efeitos) {
    for (const mod of efeito.modificadores) {
      if (mod.tipo == 'status') {
        modificadores.push(mod)
      }
    }
  }

  const modificadoresVidaMaxima = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'vidaMaxima'),
    nivelPersonagem
  )
  const modificadoresManaMaxima = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'manaMaxima'),
    nivelPersonagem
  )
  const modificadoresDefesa = calcularModificadores(
    modificadores.filter((mod) => mod.alvo == 'defesaAtual'),
    nivelPersonagem
  )

  const atributoVidaMaxima = atributosCalculados.find(
    (atributo) => atributo.nome == personagem.status.atributoVidaMaxima
  )

  const atributoManaMaxima = atributosCalculados.find(
    (atributo) => atributo.nome == personagem.status.atributoManaMaxima
  )
  const atributoDefesa = atributosCalculados.find(
    (atributo) => atributo.nome == personagem.status.atributoDefesa
  )

  const status: IStatus = {
    ...personagem.status,
    vidaMaxima:
      vidaInicial +
      (vidaTotalPorNivel +
        personagem.status.vidaMaximaBonus +
        (atributoVidaMaxima?.valorAtual ?? 0)) *
        nivelPersonagem +
      modificadoresVidaMaxima,
    manaMaxima:
      vidaInicial +
      (manaTotalPorNivel +
        personagem.status.manaMaximaBonus +
        (atributoManaMaxima?.valorAtual ?? 0)) *
        nivelPersonagem +
      modificadoresManaMaxima,
    defesaAtual:
      personagem.status.defesaBase +
      personagem.status.defesaBonus +
      (atributoDefesa?.valorAtual ?? 0) +
      modificadoresDefesa
  }

  return status
}
