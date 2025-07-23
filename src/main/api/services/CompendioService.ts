import { app } from 'electron'
import path from 'path'
import { extrairJson } from './JsonService'
import { ICompendio, IClasse, IRaca, IDivindade, IOrigem } from '../../@types/T20 GOTY/ICompendio'
import { IPoder } from '../../@types/T20 GOTY/IPoder'
import { IEquipamento } from '../../@types/T20 GOTY/IInventario'
import { IMagia } from '../../@types/T20 GOTY/IMagia'

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

const getCompendioPoderes = async (): Promise<Partial<IPoder>[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'poderes')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)

  const result = await extrairJson<Partial<IPoder>>(caminhoBase)
  const poderes = result

  return poderes
}

const getCompendioEquipamentos = async (): Promise<Partial<IEquipamento>[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'equipamentos')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)

  const result = await extrairJson<Partial<IEquipamento>>(caminhoBase)
  const equipamentos = result
  return equipamentos
}

const getCompendioMagias = async (): Promise<Partial<IMagia>[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'magias')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)
  const result = await extrairJson<Partial<IMagia>>(caminhoBase)
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

  return origens
}
