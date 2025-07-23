import { IAtributo } from '@renderer/@types/T20 GOTY/IAtributo'
import { IEfeito, IModificador } from '@renderer/@types/T20 GOTY/IEfeito'
import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { calcularModificadores } from './Calcular_Modificadores'

type IPericiaPreCalculo = {
  id: number
  nome: string
  bonus: number
  ehTreinado: boolean
  categoria: string
  atributo: string
  requerTreinamento: boolean
  sofrePenalidadeArmadura: boolean
}

export const calcularPericias = (
  pericias: IPericiaPreCalculo[],
  atributosCalculados: IAtributo[],
  efeitos: IEfeito[],
  nivelAtual: number
): IPericia[] => {
  const periciasFinais: IPericia[] = []
  const todosModificadores: IModificador[] = []

  for (const efeito of efeitos) {
    for (const mod of efeito.modificadores) {
      if (mod.estaAtivo && mod.tipo == 'pericias') {
        todosModificadores.push(mod)
      }
    }
  }

  for (const pericia of pericias) {
    let valorTreinamento = 0

    const modificadores: IModificador[] = todosModificadores.filter(
      (mod) => mod.alvo == pericia.nome
    )

    const valorModificadoresPericia = calcularModificadores(modificadores, nivelAtual)
    if (pericia.ehTreinado) {
      valorTreinamento = nivelAtual <= 6 ? 2 : nivelAtual <= 14 ? 4 : 6
    }
    const atributo = atributosCalculados.find((atributo) => atributo.nome === pericia.atributo)
    if (atributo) {
      periciasFinais.push({
        ...pericia,
        valorAtual: Math.floor(
          (atributo.valorAtual ?? 0) +
            valorTreinamento +
            nivelAtual / 2 +
            valorModificadoresPericia +
            pericia.bonus
        )
      })
    }
  }

  return periciasFinais
}
