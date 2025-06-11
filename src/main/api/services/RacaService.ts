import path from 'path'
import { extrairJson } from './JsonService'
import { IRaca } from '../../@types/IRaca'

export const getRacasDefault = async (): Promise<IRaca[]> => {
  const pasta = path.join('packs', 'T20 GOTY', 'racas')
  const racas = await extrairJson(pasta)
  return racas as IRaca[]
}
