import { IAtributoDTO } from '../../@types/T20 GOTY/dto/IAtributoDTO'
import { IStatusDTO } from '../../@types/T20 GOTY/dto/IStatusDTO'
import { Efeito, Modificador } from '../entities/Efeito'
import { Personagem } from '../entities/Personagem'
import { calcularModificadores } from './CalcularModificadores'

export const calcularStatus = (
  personagem: Personagem,
  atributosCalculados: IAtributoDTO[],
  efeitos: Efeito[],
  nivelPersonagem: number
): IStatusDTO => {
  let vidaInicial = 0
  let vidaTotalPorNivel = 0
  let manaTotalPorNivel = 0

  for (const classe of personagem.classes) {
    if (classe.nome === personagem.classeInicial) {
      vidaInicial = classe.vidaInicial
    }
  }

  for (const classe of personagem.classes) {
    vidaTotalPorNivel += classe.vidaPorNivel
    manaTotalPorNivel += classe.manaPorNivel
  }

  const modificadores: Modificador[] = []

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

  const status: IStatusDTO = {
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
