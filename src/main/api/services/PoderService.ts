import path from 'path'
import { SQLiteDataSource } from '../data-source'
import { Poder } from '../entities/Poder'
import { extrairJson } from './JsonService'
import { DeepPartial } from 'typeorm'
import { Nivel } from '../entities/Nivel'

export const PoderRepository = SQLiteDataSource.getRepository(Poder)

export const getPoderesDefault = async (): Promise<DeepPartial<Poder[]>> => {
  const pasta = path.join('packs', 'T20 GOTY', 'poderes')
  const result = (await extrairJson(pasta)) as DeepPartial<Poder[]>
  const poderes = result
  return poderes
}

export const postPoder = async (_poder: DeepPartial<Poder>, _idNivel: number): Promise<void> => {
  try {
    const NiveisRepository = SQLiteDataSource.getRepository(Nivel)
    const nivelEncontrado = await NiveisRepository.findOneBy({ id: _idNivel })
    if (!nivelEncontrado) {
      throw new Error('Nivel não encontrado!')
    }
    const novoPoder = PoderRepository.create({
      ..._poder,
      nivel: nivelEncontrado
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
