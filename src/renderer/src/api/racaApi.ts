import { IRaca } from '@renderer/@types/T20 GOTY/IRaca'

export const exibirRacas = async (): Promise<Partial<IRaca[]>> => {
  return await window.api.raca.getRacasDefault()
}
