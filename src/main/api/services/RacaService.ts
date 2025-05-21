import path from 'path'
import { extrairJson } from './JsonService'
import { IRaca } from '../../@types/IRaca'

export const getRacasDefault = async (): Promise<Partial<IRaca[]>> => {
  const pasta = path.join('packs', 'T20 GOTY', 'racas')
  return await extrairJson(pasta)
}
