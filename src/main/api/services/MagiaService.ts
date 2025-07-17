import { DeepPartial } from 'typeorm'
import { SQLiteDataSource } from '../data-source'
import { Grimorio, Magia } from '../entities/Magia'

const GrimorioRepository = SQLiteDataSource.getRepository(Grimorio)
const MagiaRepository = SQLiteDataSource.getRepository(Magia)

export const putGrimorio = async (_grimorio: Grimorio): Promise<void> => {
  try {
    const grimorioEncontrado = await GrimorioRepository.findOneBy({ id: _grimorio.id })

    if (!grimorioEncontrado) {
      throw new Error('Grimório não encontrado!')
    }

    GrimorioRepository.merge(grimorioEncontrado, _grimorio)

    await GrimorioRepository.save(grimorioEncontrado)
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao atualizar grimório')
  }
}

export const getGrimorioPersonagem = async (_idPersonagem: number): Promise<Grimorio> => {
  try {
    const grimorio = await GrimorioRepository.findOne({
      where: { personagem: { id: _idPersonagem } }
    })

    if (grimorio) {
      return grimorio
    }

    throw new Error('Grimório não encontrado!')
  } catch {
    throw new Error('Erro ao recuperar grimório.')
  }
}

export const postMagia = async (_magia: DeepPartial<Magia>, _idGrimorio: number): Promise<void> => {
  try {
    const grimorio = await GrimorioRepository.findOneBy({ id: _idGrimorio })
    if (!grimorio) {
      throw new Error('Grimório não encontrado.')
    }

    const novaMagia = MagiaRepository.create({
      ..._magia,
      aprimoramentos: _magia.aprimoramentos,
      grimorio: grimorio
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
      throw new Error('Magia não encontrada!')
    }

    MagiaRepository.merge(magiaEncontrada, _magia)
    magiaEncontrada.aprimoramentos = _magia.aprimoramentos
    await MagiaRepository.save(magiaEncontrada)
  } catch {
    throw new Error('Erro ao atualizar magia!')
  }
}

export const deleteMagia = async (_id: number): Promise<void> => {
  try {
    await MagiaRepository.delete(_id)
  } catch {
    throw new Error('Erro ao deletar magia.')
  }
}
