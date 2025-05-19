import { SQLiteDataSource } from '../data-source'
import { Magia } from '../entities/Magia'

export const MagiaRepository = SQLiteDataSource.getRepository(Magia)
