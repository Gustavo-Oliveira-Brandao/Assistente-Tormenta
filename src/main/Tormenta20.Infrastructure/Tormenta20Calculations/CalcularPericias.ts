import { IAtributoCalculado } from '../../Tormenta20.Application/DTOs/IAtributo'
import { IPericiaCalculada } from '../../Tormenta20.Application/DTOs/IPericia'
import { IEfeito, IModificador } from '../../Tormenta20.Domain/@types/IEfeito'
import { IPericia } from '../../Tormenta20.Domain/@types/IPericia'
import { calcularModificadores } from './CalcularModificadores'

export const calcularPericias = (
  pericias: IPericia[],
  atributosCalculados: IAtributoCalculado[],
  efeitos: IEfeito[],
  nivelAtual: number
): IPericiaCalculada[] => {
  const periciasFinais: IPericiaCalculada[] = []
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
      (mod) => mod.alvo == pericia.key
    )

    const valorModificadoresPericia = calcularModificadores(modificadores, nivelAtual)
    if (pericia.ehTreinado) {
      valorTreinamento = nivelAtual <= 6 ? 2 : nivelAtual <= 14 ? 4 : 6
    }
    const atributo = atributosCalculados.find((atributo) => atributo.key === pericia.atributo)
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
