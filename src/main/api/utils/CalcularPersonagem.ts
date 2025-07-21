import { IPersonagemDTO } from '../../@types/T20 GOTY/dto/IPersonagemDTO'
import { Personagem } from '../entities/Personagem'
import { calcularAtributos } from './CalcularAtributos'
import { calcularDeslocamentos } from './CalcularDeslocamentos'
import { calcularPericias } from './CalcularPericias'
import { calcularStatus } from './CalcularStatus'

export const calcularPersonagem = async (personagemBruto: Personagem): Promise<IPersonagemDTO> => {
  let nivelAtual = 0

  for (const classe of personagemBruto.classes) {
    nivelAtual += classe.nivel
  }

  const efeitosAtivos = personagemBruto.efeitos.filter((efeito) => efeito.estaAtivo)

  const atributos = calcularAtributos(personagemBruto.atributos, efeitosAtivos, nivelAtual)

  const pericias = calcularPericias(personagemBruto.pericias, atributos, efeitosAtivos, nivelAtual)

  const status = calcularStatus(personagemBruto, atributos, efeitosAtivos, nivelAtual)

  const deslocamentos = calcularDeslocamentos(
    personagemBruto.deslocamento,
    efeitosAtivos,
    nivelAtual
  )

  const personagemFinal: IPersonagemDTO = {
    ...personagemBruto,
    nivelAtual: nivelAtual,
    atributos: atributos,
    pericias: pericias,
    status: status,
    deslocamento: deslocamentos
  }

  return personagemFinal
}
