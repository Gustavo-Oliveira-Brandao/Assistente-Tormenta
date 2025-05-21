import path from 'path'
import { extrairJson } from './JsonService'
import { IRaca } from '../../@types/IRaca'
import { DeepPartial } from 'typeorm'

export const getRacasDefault = async (): Promise<DeepPartial<IRaca[]>> => {
  const pasta = path.join('packs', 'T20 GOTY', 'racas')
  return await extrairJson(pasta)
}
