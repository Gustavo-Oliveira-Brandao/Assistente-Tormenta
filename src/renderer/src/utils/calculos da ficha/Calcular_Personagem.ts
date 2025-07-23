import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { calcularAtributos } from './Calcular_Atributos'
import { calcularPericias } from './Calcular_Pericias'
import { calcularStatus } from './Calcular_Status'
import { calcularDeslocamentos } from './Calcular_Deslocamentos'

export const calcularPersonagem = async (personagemBruto: IPersonagem): Promise<IPersonagem> => {
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

  const personagemFinal: IPersonagem = {
    ...personagemBruto,
    nivel: nivelAtual,
    atributos: atributos,
    pericias: pericias,
    status: status,
    deslocamento: deslocamentos
  }

  return personagemFinal
}
