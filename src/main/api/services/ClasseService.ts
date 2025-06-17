import path from 'path'
import { extrairJson } from './JsonService'
import { IClasse } from '../../@types/IClasse'

export const getClassesDefault = async (): Promise<IClasse[]> => {
  const pasta = path.join('packs', 'T20 GOTY', 'classes')
  const classes = (await extrairJson(pasta)) as IClasse[]
  return classes
}
