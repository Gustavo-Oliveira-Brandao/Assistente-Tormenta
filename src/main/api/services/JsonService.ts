import { app } from 'electron'
import path from 'path'
import * as fs from 'fs/promises'
import { DeepPartial } from 'typeorm'
import { Poder } from '../entities/Poder'
import { IClasse } from '../../@types/IClasse'
import { IRaca } from '../../@types/IRaca'

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
  } catch {
    throw new Error('Erro ao escrever arquivo')
  }
}

export const reescreverPoderesGerais = async (poderes: DeepPartial<Poder>[]): Promise<void> => {
  try {
    const pasta = path.join('packs', 'T20 GOTY', 'poderes-gerais')
    const caminhoBase = app.isPackaged
      ? path.join(process.resourcesPath, pasta)
      : path.join(app.getAppPath(), 'resources', pasta)

    for (const poder of poderes) {
      if (poder.nome && poder.categoria) {
        reescreverJson(poder, poder.categoria, poder.nome, caminhoBase)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export const reescreverPoderesClasses = async (classes: IClasse[]): Promise<void> => {
  try {
    const pasta = path.join('packs', 'T20 GOTY', 'poderes-classe')

    const caminhoBase = app.isPackaged
      ? path.join(process.resourcesPath, pasta)
      : path.join(app.getAppPath(), 'resources', pasta)

    for (const classe of classes) {
      for (const poder of classe.poderes) {
        if (poder.nome != null) {
          reescreverJson(poder, classe.nome, poder.nome, caminhoBase)
        }
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export const reescreverPoderesRacas = async (racas: IRaca[]): Promise<void> => {
  try {
    const pasta = path.join('packs', 'T20 GOTY', 'poderes-raca')

    const caminhoBase = app.isPackaged
      ? path.join(process.resourcesPath, pasta)
      : path.join(app.getAppPath(), 'resources', pasta)

    for (const raca of racas) {
      for (const poder of raca.poderes) {
        if (poder.nome != null) {
          reescreverJson(poder, raca.nome, poder.nome, caminhoBase)
        }
      }
    }
  } catch (err) {
    console.log(err)
  }
}
