import { IAtributoDTO } from '../../@types/T20 GOTY/dto/IAtributoDTO'
import { IPericiaDTO } from '../../@types/T20 GOTY/dto/IPericiaDTO'
import { Efeito, Modificador } from '../entities/Efeito'
import { Pericia } from '../entities/Pericia'
import { calcularModificadores } from './CalcularModificadores'

export const calcularPericias = (
  pericias: Pericia[],
  atributosCalculados: IAtributoDTO[],
  efeitos: Efeito[],
  nivelAtual: number
): IPericiaDTO[] => {
  const periciasFinais: IPericiaDTO[] = []
  const todosModificadores: Modificador[] = []

  for (const efeito of efeitos) {
    for (const mod of efeito.modificadores) {
      if (mod.estaAtivo && mod.tipo == 'pericias') {
        todosModificadores.push(mod)
      }
    }
  }

  for (const pericia of pericias) {
    let valorTreinamento = 0

    const modificadores: Modificador[] = todosModificadores.filter(
      (mod) => mod.alvo == pericia.nome
    )

    const valorModificadoresPericia = calcularModificadores(modificadores, nivelAtual)
    if (pericia.treinamento === 'treinado') {
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
