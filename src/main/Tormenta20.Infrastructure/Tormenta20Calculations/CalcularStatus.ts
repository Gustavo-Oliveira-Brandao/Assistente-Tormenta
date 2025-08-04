import { IAtributoCalculado } from '../../Tormenta20.Application/DTOs/IAtributo'
import { IPersonagemResponseDTO } from '../../Tormenta20.Application/DTOs/IPersonagem'
import { IStatusCalculado } from '../../Tormenta20.Application/DTOs/IStatus'
import { IEfeito, IModificador } from '../../Tormenta20.Domain/@types/IEfeito'
import { calcularModificadores } from './CalcularModificadores'

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
      30 +
      (vidaTotalPorNivel +
        statusPersonagem.vidaMaximaBonus +
        (atributoVidaMaxima?.valorAtual ?? 0)) *
        nivelPersonagem +
      modificadoresVidaMaxima,
    manaMaxima:
      vidaInicial +
      30 +
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
