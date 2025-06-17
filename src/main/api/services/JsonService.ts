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
