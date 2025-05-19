import { IGrimorio } from '../@types/T20 GOTY/IGrimorio'
import { SQLiteDataSource } from '../data-source'
import { Grimorio } from '../entities/Grimorio'
import { Magia } from '../entities/Magia'

const MagiaRepository = SQLiteDataSource.getRepository(Magia)
const GrimorioRepository = SQLiteDataSource.getRepository(Grimorio)

export const getGrimoriosPorPersonagem = async (_idPersonagem: number): Promise<IGrimorio[]> => {
  try {
    const grimorios = await GrimorioRepository.find({
      where: { personagem: { id: _idPersonagem } }
    })
  } catch {}
}
