import path from 'path'
import { extrairJson } from './JsonService'
import { IRaca } from '../../@types/IRaca'
import { app } from 'electron'

export const getRacasDefault = async (): Promise<IRaca[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'racas')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)
  const racas = await extrairJson<IRaca>(caminhoBase)

  return racas
}
