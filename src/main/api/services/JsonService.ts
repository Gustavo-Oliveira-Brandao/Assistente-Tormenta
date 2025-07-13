import path from 'path'
import * as fs from 'fs/promises'

export const extrairJson = async <T>(caminhoBase: string): Promise<T[]> => {
  try {
    const arquivosEPastas = await fs.readdir(caminhoBase)

    const promises: Promise<T[] | T | null>[] = []

    for (const arquivo of arquivosEPastas) {
      const caminhoArquivo = path.join(caminhoBase, arquivo)
      const stats = await fs.stat(caminhoArquivo)

      if (stats.isDirectory()) {
        promises.push(extrairJson<T>(caminhoArquivo))
      } else if (stats.isFile() && arquivo.endsWith('.json')) {
        promises.push(
          (async () => {
            try {
              const conteudo = await fs.readFile(caminhoArquivo, { encoding: 'utf-8' })
              return JSON.parse(conteudo) as T
            } catch (err) {
              console.log(err)
              return null
            }
          })()
        )
      }
    }

    const resultados = await Promise.all(promises)

    const dadosJson: T[] = resultados.flatMap((resultado) => {
      if (resultado == null) {
        return []
      } else if (Array.isArray(resultado)) {
        return resultado
      } else {
        return [resultado]
      }
    })

    return dadosJson
  } catch (err) {
    console.log(err)
    throw new Error(`Erro ao acessar diretório ${caminhoBase}.`)
  }
}

export const reescreverJson = async <T>(data: T, caminhoArquivo: string): Promise<void> => {
  try {
    const dir = path.dirname(caminhoArquivo)
    await fs.mkdir(dir, { recursive: true })

    const jsonString = JSON.stringify(data, null, 2)

    await fs.writeFile(caminhoArquivo, jsonString, { encoding: 'utf-8' })
  } catch (err) {
    console.error(`Erro ao reescrever o arquivo JSON ${caminhoArquivo}:`, err)
    throw new Error(`Não foi possível reescrever o arquivo JSON`)
  }
}
