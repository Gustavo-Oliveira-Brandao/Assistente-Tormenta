import path from 'path'
import { SQLiteDataSource } from '../data-source'
import { extrairJson } from './JsonService'
import { IPoderDB } from '../../@types/IPoderDB'
import { PoderRef } from '../entities/PoderRef'
import { Personagem } from '../entities/Personagem'

export const PoderRepository = SQLiteDataSource.getRepository(PoderRef)

export const getPoderesDefault = async (): Promise<IPoderDB[]> => {
  const pasta = path.join('packs', 'T20 GOTY', 'poderes')
  const result = (await extrairJson(pasta)) as IPoderDB[]
  const poderes = result

  return poderes
}

export const getPoderesPersonagem = async (_idPersonagem: number): Promise<PoderRef[]> => {
  try {
    const poderes = await PoderRepository.find({ where: { personagem: { id: _idPersonagem } } })
    return poderes
  } catch {
    throw new Error('Erro ao recuperar poderes')
  }
}

export const postPoder = async (_poder: Partial<PoderRef>, _idPersonagem: number): Promise<void> => {
  try {
    const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
    const personagem = await PersonagemRepository.findOneBy({ id: _idPersonagem })
    if (!personagem) {
      throw new Error('Personagem não encontrado')
    }
    const novoPoder = PoderRepository.create({ ..._poder, personagem: personagem })
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
