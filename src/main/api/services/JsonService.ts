import { app } from 'electron'
import path from 'path'
import * as fs from 'fs/promises'

export const extrairJson = async <T>(pasta: string): Promise<T[]> => {
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)

  try {
    const arquivos = await fs.readdir(caminhoBase)
    const arquivosJson = arquivos.filter((arquivo) => arquivo.endsWith('.json'))
    const dadosJson: T[] = []

    for (const arquivo of arquivosJson) {
      const caminhoArquivo = path.join(caminhoBase, arquivo)
      const conteudo = await fs.readFile(caminhoArquivo, { encoding: 'utf-8' })

      try {
        dadosJson.push(JSON.parse(conteudo))
      } catch {
        throw new Error('Erro ao ler arquivos json.')
      }
    }

    return dadosJson
  } catch {
    throw new Error('Erro ao retornar arquivos json.')
  }
}
