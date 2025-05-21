import { IRaca } from '@renderer/@types/T20 GOTY/IRaca'
import { DeepPartial } from 'typeorm'

export const exibirRacasDefault = async (): Promise<DeepPartial<IRaca[]>> => {
  return await window.api.raca.getRacasDefault()
}
