import { Modificador } from '../entities/Efeito'

export const calcularModificadores = (modificadores: Modificador[], nivel: number): number => {
  let bonusTotal = 0
  for (const mod of modificadores) {
    if (mod.estaAtivo) {
      if (mod.ehPorNivel) {
        bonusTotal += mod.valor * nivel
      } else {
        bonusTotal += mod.valor
      }
    }
  }
  return bonusTotal
}
