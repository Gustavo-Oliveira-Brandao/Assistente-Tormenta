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

/* export const escreverJson = async <T>(dados: T[], pasta): Promise<void> => {
  try {
    for (const dado of dados) {
      const nomeArquivo = `${dado.nome}.json`
      const caminhoBase = path.join(pasta, nomeArquivo)

      const conteudo = JSON.stringify(dado, null, 2)
      await fs.writeFile(caminhoBase, conteudo, { encoding: 'utf-8' })
    }
  } catch {
    console.log('Erro ao escrever arquivos.')
  }
}
 */
