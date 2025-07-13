import path from 'path'
import { extrairJson, reescreverJson } from './JsonService'
import { IRaca } from '../../@types/IRaca'
import { app } from 'electron'
import { v4 as uuidv4 } from 'uuid'
export const getRacasDefault = async (): Promise<IRaca[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'racas')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)
  const racas = await extrairJson<IRaca>(caminhoBase)

  for (const raca of racas) {
    raca.key = uuidv4()
    raca.publicacao = 'Tormenta20 - Edição Jogo do Ano'
    await reescreverJson(raca, path.join(caminhoBase, `${raca.nome}.json`))
  }
  return racas
}
