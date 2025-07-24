import { IModificador } from '../../@types/T20 GOTY/IEfeito'

export const calcularModificadores = (modificadores: IModificador[], nivel: number): number => {
  let bonusTotal = 0
  for (const mod of modificadores) {
    if (mod.estaAtivo) {
      if (mod.escalonamento == 'nivel') {
        bonusTotal += mod.valor * nivel
      } else {
        bonusTotal += mod.valor
      }
    }
  }
  return bonusTotal
}
