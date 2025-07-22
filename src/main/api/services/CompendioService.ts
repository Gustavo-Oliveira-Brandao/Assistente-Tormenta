import { app } from 'electron'
import path from 'path'
import { DeepPartial } from 'typeorm'
import { Poder } from '../entities/Poder'
import { extrairJson, reescreverJson } from './JsonService'
import { Equipamento } from '../entities/Inventario'
import { Magia } from '../entities/Magia'
import { ICompendio, IClasse, IRaca, IDivindade, IOrigem } from '../../@types/T20 GOTY/ICompendio'

export const getCompendioGeral = async (): Promise<ICompendio> => {
  try {
    const racas = await getCompendioRacas()
    const classes = await getCompendioClasses()
    const poderes = await getCompendioPoderes()
    const equipamentos = await getCompendioEquipamentos()
    const magias = await getCompendioMagias()
    const origens = await getCompendioOrigens()
    const divindades = await getCompendioDivindades()

    const compendio: ICompendio = {
      racas: racas,
      classes: classes,
      poderes: poderes,
      equipamentos: equipamentos,
      magias: magias,
      divindades: divindades,
      origens: origens
    }

    return compendio
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao recuperar compêndio.')
  }
}

const getCompendioPoderes = async (): Promise<DeepPartial<Poder>[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'poderes')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)

  const result = await extrairJson<DeepPartial<Poder>>(caminhoBase)
  const poderes = result

  return poderes
}

const getCompendioEquipamentos = async (): Promise<DeepPartial<Equipamento>[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'equipamentos')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)

  const result = await extrairJson<DeepPartial<Equipamento>>(caminhoBase)
  const equipamentos = result

  return equipamentos
}

const getCompendioMagias = async (): Promise<DeepPartial<Magia>[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'magias')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)
  const result = await extrairJson<DeepPartial<Magia>>(caminhoBase)
  const magias = result
  return magias
}

const getCompendioClasses = async (): Promise<IClasse[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'classes')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)
  const classes = await extrairJson<IClasse>(caminhoBase)
  return classes
}

const getCompendioRacas = async (): Promise<IRaca[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'racas')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)
  const racas = await extrairJson<IRaca>(caminhoBase)

  return racas
}

const getCompendioDivindades = async (): Promise<IDivindade[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'divindades')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)

  const divindades = await extrairJson<IDivindade>(caminhoBase)

  return divindades
}

const getCompendioOrigens = async (): Promise<IOrigem[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'origens')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)

  const origens = await extrairJson<IOrigem>(caminhoBase)

  for (const origem of origens) {
    for (const pericia of origem.pericias) {
      const periciaAtt = {
        pericia: pericia,
        ehOficio: false
      }

      origem.beneficioPericias.push(periciaAtt)
    }
    await reescreverJson(
      origem,
      path.join(caminhoBase, origem.nome.replace(/[\s/\\?%*:|"<>]/g, '_'))
    )
  }

  return origens
}
