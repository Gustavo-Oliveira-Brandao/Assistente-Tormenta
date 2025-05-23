import path from 'path'
import { SQLiteDataSource } from '../data-source'
import { Personagem } from '../entities/Personagem'
import { Poder } from '../entities/Poder'
import { extrairJson } from './JsonService'
import { DeepPartial } from 'typeorm'

export const PoderRepository = SQLiteDataSource.getRepository(Poder)

export const getPoderesDefault = async (): Promise<DeepPartial<Poder[]>> => {
  const pasta = path.join('packs', 'T20 GOTY', 'demo-poder')
  const result = (await extrairJson(pasta)) as DeepPartial<Poder[]>
  const poderes = result.flat()
  return poderes
}

export const getPoderesPorPersonagem = async (_idPersonagem: number): Promise<Poder[]> => {
  try {
    const poderes = await PoderRepository.find({ where: { personagem: { id: _idPersonagem } } })
    return poderes
  } catch {
    throw new Error('Erro ao buscar poderes.')
  }
}

export const getPoderesPorClasse = async (_idClasse: number): Promise<Poder[]> => {
  try {
    const poderes = await PoderRepository.find({ where: { classe: { id: _idClasse } } })
    return poderes
  } catch {
    throw new Error('Erro ao buscar poderes.')
  }
}

export const postPoder = async (
  _poder: DeepPartial<Poder>,
  _idPersonagem: number
): Promise<void> => {
  try {
    const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
    const personagem = await PersonagemRepository.findOneBy({ id: _idPersonagem })
    if (!personagem) {
      throw new Error('Personagem não encontrado!')
    }
    const novoPoder = await PoderRepository.create({
      ..._poder,
      personagem: personagem
    })

    await PoderRepository.save(novoPoder)
  } catch {
    throw new Error('Erro ao adicionar poder!')
  }
}

export const deletePoder = async (_id: number): Promise<void> => {
  try {
    await PoderRepository.delete(_id)
  } catch {
    throw new Error('Erro ao deletar poder.')
  }
}
