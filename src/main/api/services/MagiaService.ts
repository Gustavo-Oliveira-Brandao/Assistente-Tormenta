import { DeepPartial } from 'typeorm'
import { SQLiteDataSource } from '../data-source'
import { Personagem } from '../entities/Personagem'
import path from 'path'
import { extrairJson } from './JsonService'
import { Magia } from '../entities/Magia'
import { app } from 'electron'

const MagiaRepository = SQLiteDataSource.getRepository(Magia)

export const getMagiasPersonagem = async (_idPersonagem: number): Promise<Magia[]> => {
  try {
    const magias = await MagiaRepository.find({
      where: { personagem: { id: _idPersonagem } }
    })
    return magias
  } catch {
    throw new Error('Erro ao recuperar magias.')
  }
}

export const postMagia = async (
  _magia: DeepPartial<Magia>,
  _idPersonagem: number
): Promise<void> => {
  try {
    const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
    const personagem = await PersonagemRepository.findOneBy({ id: _idPersonagem })
    if (!personagem) {
      throw new Error('Personagem não encontrado.')
    }

    const novaMagia = MagiaRepository.create({
      ..._magia,
      aprimoramentos: _magia.aprimoramentos,
      personagem: personagem
    })

    await MagiaRepository.save(novaMagia)
  } catch {
    throw new Error('Erro ao adicionar magia.')
  }
}

export const putMagia = async (_magia: Magia): Promise<void> => {
  try {
    const magiaEncontrada = await MagiaRepository.findOneBy({ id: _magia.id })
    if (!magiaEncontrada) {
      throw new Error('Grimorio não encontrado!')
    }

    MagiaRepository.merge(magiaEncontrada, _magia)
    magiaEncontrada.aprimoramentos = _magia.aprimoramentos
    await MagiaRepository.save(magiaEncontrada)
  } catch {
    throw new Error('Erro ao atualizar magias!')
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
