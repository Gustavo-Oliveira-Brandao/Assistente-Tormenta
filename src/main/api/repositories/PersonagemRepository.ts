import { SQLiteDataSource } from '../data-source'
import { Personagem } from '../entities/Personagem'

export const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
