import { calcularAtributos } from './CalcularAtributos'
import { calcularPericias } from './CalcularPericias'
import { calcularStatus } from './CalcularStatus'
import { calcularDeslocamentos } from './CalcularDeslocamentos'
import {
  IPersonagemFinal,
  IPersonagemResponseDTO
} from '../../Tormenta20.Application/DTOs/IPersonagem'

export const calcularPersonagem = async (
  personagemBruto: IPersonagemResponseDTO
): Promise<IPersonagemFinal> => {
  if (personagemBruto.raca == null || personagemBruto.deslocamentos == null) {
    throw new Error('Erro ao processar personagme.')
  }

  let nivelAtual = 0

  for (const classe of personagemBruto.classes) {
    nivelAtual += classe.nivel
  }

  const efeitosAtivos = personagemBruto.efeitos.filter((efeito) => efeito.estaAtivo)

  const atributos = calcularAtributos(personagemBruto.atributos, efeitosAtivos, nivelAtual)

  const pericias = calcularPericias(personagemBruto.pericias, atributos, efeitosAtivos, nivelAtual)

  const status = calcularStatus(personagemBruto, atributos, efeitosAtivos, nivelAtual)

  const deslocamentos = calcularDeslocamentos(
    personagemBruto.deslocamentos,
    efeitosAtivos,
    nivelAtual
  )

  const personagemFinal: IPersonagemFinal = {
    ...personagemBruto,
    raca: personagemBruto.raca,
    nivel: nivelAtual,
    atributos: atributos,
    pericias: pericias,
    status: status,
    deslocamentos: deslocamentos
  }

  return personagemFinal
}
