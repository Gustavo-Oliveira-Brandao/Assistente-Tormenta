import path from 'path'
import { extrairJson } from './JsonService'
import { IClasse } from '../../@types/IClasse'
import { app } from 'electron'

export const getClassesDefault = async (): Promise<IClasse[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'classes')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)
  const classes = (await extrairJson(caminhoBase)) as IClasse[]
  return classes
}
