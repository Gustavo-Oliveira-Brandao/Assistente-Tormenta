import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { IEfeito, IModificador } from '@renderer/@types/T20 GOTY/IEfeito'
import { calcularModificadores } from './Calcular_Modificadores'

type IAtributoPreCalculo = {
  id: number
  nome: string
  key: string
  valorBase: number
  bonus: number
}

export const calcularAtributos = (
  atributos: IAtributoPreCalculo[],
  efeitos: IEfeito[],
  nivelPersonagem: number
): IAtributo[] => {
  const atributosFinais: IAtributo[] = []
  const todosModificadores: IModificador[] = []

  for (const efeito of efeitos) {
    for (const mod of efeito.modificadores) {
      if (mod.estaAtivo && mod.tipo == 'atributos') {
        todosModificadores.push(mod)
      }
    }
  }

  for (const atributo of atributos) {
    const modificadores = todosModificadores.filter((mod) => mod.alvo == atributo.nome)
    const valorModificadores = calcularModificadores(modificadores, nivelPersonagem)
    if (atributo) {
      const atributoFinal: IAtributo = {
        ...atributo,
        valorAtual: atributo.valorBase + atributo.bonus + valorModificadores
      }

      atributosFinais.push(atributoFinal)
    }
  }

  return atributosFinais
}
