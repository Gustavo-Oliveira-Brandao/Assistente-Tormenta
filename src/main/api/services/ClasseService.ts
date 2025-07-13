import path from 'path'
import { extrairJson, reescreverJson } from './JsonService'
import { IClasse } from '../../@types/IClasse'
import { app } from 'electron'

import { v4 as uuidv4 } from 'uuid'
export const getClassesDefault = async (): Promise<IClasse[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'classes')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)
  const classes = await extrairJson<IClasse>(caminhoBase)
  for (const classe of classes) {
    classe.key = uuidv4()
    classe.publicacao = 'Tormenta20 - Edição Jogo do Ano'
    await reescreverJson(classe, path.join(caminhoBase, `${classe.nome}.json`))
  }
  return classes
}
