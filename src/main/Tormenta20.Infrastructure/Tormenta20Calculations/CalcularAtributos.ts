import { IAtributoCalculado } from '../../Tormenta20.Application/DTOs/IAtributo'
import { IAtributo } from '../../Tormenta20.Domain/@types/IAtributo'
import { IEfeito, IModificador } from '../../Tormenta20.Domain/@types/IEfeito'
import { calcularModificadores } from './CalcularModificadores'

export const calcularAtributos = (
  atributos: IAtributo[],
  efeitos: IEfeito[],
  nivelPersonagem: number
): IAtributoCalculado[] => {
  const atributosFinais: IAtributoCalculado[] = []
  const todosModificadores: IModificador[] = []

  for (const efeito of efeitos) {
    for (const mod of efeito.modificadores) {
      if (mod.estaAtivo && mod.tipo == 'atributos') {
        todosModificadores.push(mod)
      }
    }
  }

  for (const atributo of atributos) {
    const modificadores = todosModificadores.filter((mod) => mod.alvo == atributo.key)
    const valorModificadores = calcularModificadores(modificadores, nivelPersonagem)
    if (atributo) {
      const atributoFinal: IAtributoCalculado = {
        ...atributo,
        valorAtual: atributo.valorBase + atributo.bonus + valorModificadores
      }

      atributosFinais.push(atributoFinal)
    }
  }

  return atributosFinais
}
