import path from 'path'
import * as fs from 'fs/promises'

export const extrairJson = async <T>(caminhoBase: string): Promise<T[]> => {
  let dadosJson: T[] = []

  try {
    const arquivosEPastas = await fs.readdir(caminhoBase)

    for (const arquivo of arquivosEPastas) {
      const caminhoArquivo = path.join(caminhoBase, arquivo)
      const stats = await fs.stat(caminhoArquivo)

      if (stats.isDirectory()) {
        dadosJson = dadosJson.concat(await extrairJson<T>(caminhoArquivo))
      } else if (stats.isFile() && arquivo.endsWith('.json')) {
        try {
          const conteudo = await fs.readFile(caminhoArquivo, { encoding: 'utf-8' })
          dadosJson.push(JSON.parse(conteudo))
        } catch {
          throw new Error(`Erro ao ler arquivo ${arquivo}.`)
        }
      }
    }
    return dadosJson
  } catch (err) {
    console.log(err)
    throw new Error(`Erro ao acessar diretório ${caminhoBase}.`)
  }
}

export const reescreverJson = async <T>(
  data: T,
  nomeSubPasta: string,
  nomeArquivo: string,
  caminhoBase: string
): Promise<void> => {
  try {
    const jsonString = JSON.stringify(data, null, 2)

    const caminhoPasta = path.join(caminhoBase, nomeSubPasta)

    const caminhoDoArquivo = path.join(
      caminhoPasta,
      `${nomeArquivo.replace(/[\s/\\?%*:|"<>]/g, '_')}.json`
    )

    await fs.mkdir(caminhoPasta, { recursive: true })
    await fs.writeFile(caminhoDoArquivo, jsonString, { encoding: 'utf-8' })
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao escrever arquivo')
  }
}
