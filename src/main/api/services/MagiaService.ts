import { DeepPartial } from 'typeorm'
import { SQLiteDataSource } from '../data-source'
import { Grimorio } from '../entities/Grimorio'
import { Personagem } from '../entities/Personagem'
import path from 'path'
import { extrairJson } from './JsonService'
import { Magia } from '../entities/Magia'
import { app } from 'electron'

const MagiaRepository = SQLiteDataSource.getRepository(Magia)
const GrimorioRepository = SQLiteDataSource.getRepository(Grimorio)

export const getGrimoriosPorPersonagem = async (_idPersonagem: number): Promise<Grimorio[]> => {
  try {
    const grimorios = await GrimorioRepository.find({
      where: { personagem: { id: _idPersonagem } }
    })
    return grimorios
  } catch {
    throw new Error('Erro ao recuperar grimórios.')
  }
}

export const postGrimorio = async (
  _grimorio: DeepPartial<Grimorio>,
  _idPersonagem: number
): Promise<void> => {
  try {
    const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
    const personagem = await PersonagemRepository.findOneBy({ id: _idPersonagem })
    if (!personagem) {
      throw new Error('Personagem não encontrado.')
    }

    const novoGrimorio = GrimorioRepository.create({
      ..._grimorio,
      magias: _grimorio.magias,
      personagem: personagem
    })

    await GrimorioRepository.save(novoGrimorio)
  } catch {
    throw new Error('Erro ao adicionar grimorio.')
  }
}

export const putGrimorio = async (_grimorio: Grimorio): Promise<void> => {
  try {
    const grimorioEncontrado = await GrimorioRepository.findOneBy({ id: _grimorio.id })
    if (!grimorioEncontrado) {
      throw new Error('Grimorio não encontrado!')
    }

    GrimorioRepository.merge(grimorioEncontrado, _grimorio)
    await GrimorioRepository.save(grimorioEncontrado)
  } catch {
    throw new Error('Erro ao atualizar grimorio!')
  }
}

export const deleteGrimorio = async (_id: number): Promise<void> => {
  try {
    await GrimorioRepository.delete(_id)
  } catch {
    throw new Error('Erro ao deletar grimorio')
  }
}

export const postMagia = async (_magia: DeepPartial<Magia>, _idGrimorio: number): Promise<void> => {
  try {
    const GrimorioRepository = SQLiteDataSource.getRepository(Grimorio)
    const grimorio = await GrimorioRepository.findOneBy({ id: _idGrimorio })

    if (!grimorio) {
      throw new Error('Grimorio não encontrado!')
    }

    const novaMagia = MagiaRepository.create({
      ..._magia,
      aprimoramentos: _magia.aprimoramentos,
      grimorio: grimorio
    })

    await MagiaRepository.save(novaMagia)
  } catch {
    throw new Error('Erro ao adicionar magia!')
  }
}

export const deleteMagia = async (_id: number): Promise<void> => {
  try {
    await MagiaRepository.delete(_id)
  } catch {
    throw new Error('Erro ao deletar magia.')
  }
}

export const getMagiasDefault = async (): Promise<DeepPartial<Magia>[]> => {
  const pasta = path.join('packs', 'Tormenta20-Edicao-Jogo-Do-Ano', 'magias')
  const caminhoBase = app.isPackaged
    ? path.join(process.resourcesPath, pasta)
    : path.join(app.getAppPath(), 'resources', pasta)
  const result = await extrairJson<DeepPartial<Magia>>(caminhoBase)
  const magias = result
  return magias
}
