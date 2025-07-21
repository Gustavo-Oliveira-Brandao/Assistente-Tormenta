import { IAtributoDTO } from '../../@types/T20 GOTY/dto/IAtributoDTO'
import { Atributo } from '../entities/Atributo'
import { Efeito, Modificador } from '../entities/Efeito'
import { calcularModificadores } from './CalcularModificadores'

export const calcularAtributos = (
  atributos: Atributo[],
  efeitos: Efeito[],
  nivelPersonagem: number
): IAtributoDTO[] => {
  const atributosFinais: IAtributoDTO[] = []
  const todosModificadores: Modificador[] = []

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
    const atributoFinal: IAtributoDTO = {
      ...atributo,
      valorAtual: atributo.valorBase + atributo.bonus + valorModificadores
    }

    atributosFinais.push(atributoFinal)
  }

  return atributosFinais
}
