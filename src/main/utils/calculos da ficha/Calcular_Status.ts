import { IAtributoCalculado } from '../../@types/T20 GOTY/IAtributo'
import { IEfeito, IModificador } from '../../@types/T20 GOTY/IEfeito'
import { IPersonagemResponseDTO } from '../../@types/T20 GOTY/IPersonagem'
import { IStatusCalculado } from '../../@types/T20 GOTY/IStatus'
import { calcularModificadores } from './Calcular_Modificadores'

export const calcularStatus = (
  personagem: IPersonagemResponseDTO,
  atributosCalculados: IAtributoCalculado[],
  efeitos: IEfeito[],
  nivelPersonagem: number
): IStatusCalculado => {
  const statusPersonagem = personagem.status
  if (statusPersonagem == null) {
    throw new Error('Erro ao processar personagem.')
  }

  let vidaInicial = 0
  let vidaTotalPorNivel = 0
  let manaTotalPorNivel = 0

  for (const classe of personagem.classes) {
    if (classe.nome === personagem.classeOriginal) {
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
    (atributo) => atributo.nome == statusPersonagem.atributoVidaMaxima
  )

  const atributoManaMaxima = atributosCalculados.find(
    (atributo) => atributo.nome == statusPersonagem.atributoManaMaxima
  )
  const atributoDefesa = atributosCalculados.find(
    (atributo) => atributo.nome == statusPersonagem.atributoDefesa
  )

  const status: IStatusCalculado = {
    ...statusPersonagem,
    vidaMaxima:
      vidaInicial +
      (vidaTotalPorNivel +
        statusPersonagem.vidaMaximaBonus +
        (atributoVidaMaxima?.valorAtual ?? 0)) *
        nivelPersonagem +
      modificadoresVidaMaxima,
    manaMaxima:
      vidaInicial +
      (manaTotalPorNivel +
        statusPersonagem.manaMaximaBonus +
        (atributoManaMaxima?.valorAtual ?? 0)) *
        nivelPersonagem +
      modificadoresManaMaxima,
    defesaAtual:
      statusPersonagem.defesaBase +
      statusPersonagem.defesaBonus +
      (atributoDefesa?.valorAtual ?? 0) +
      modificadoresDefesa
  }

  return status
}
