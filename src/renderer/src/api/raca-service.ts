import { IRaca } from '@renderer/@types/T20 GOTY/IRaca'

export const exibirRacasDefault = async (): Promise<IRaca[]> => {
  const racas = await window.api.racas.getRacasDefault()
  return racas
}
