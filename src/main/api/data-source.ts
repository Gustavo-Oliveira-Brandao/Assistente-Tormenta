import { DataSource } from 'typeorm'
import { Atributo } from './entities/Atributo'
import { Dano } from './entities/Dano'
import { Deslocamento } from './entities/Deslocamento'
import { Grimorio } from './entities/Grimorio'
import { Pericia } from './entities/Pericia'
import { Personagem } from './entities/Personagem'
import { Proficiencia } from './entities/Proficiencia'
import { ClassePersonagem } from './entities/ClassePersonagem'
import { Poder, SubEfeito, Tag } from './entities/Poder'
import { AprimoramentoMagia, Magia } from './entities/Magia'
import { Modificador } from './entities/Modificador'
import { Status } from './entities/Status'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/UserData/db.sqlite',
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
  entities: [
    Atributo,
    Dano,
    ClassePersonagem,
    Poder,
    Tag,
    Modificador,
    SubEfeito,
    Deslocamento,
    Grimorio,
    Magia,
    Pericia,
    AprimoramentoMagia,
    Personagem,
    Proficiencia,
    Status
  ]
})
