import { SQLiteDataSource } from '../data-source'
import { Poder } from '../entities/Poder'

export const PoderRepository = SQLiteDataSource.getRepository(Poder)
