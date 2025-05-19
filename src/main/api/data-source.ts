import { DataSource } from 'typeorm'
import { AprimoramentoMagia } from './entities/AprimoramentoMagia'
import { Atributo } from './entities/Atributo'
import { Bonus } from './entities/Bonus'
import { Classe } from './entities/Classe'
import { Dano } from './entities/Dano'
import { Deslocamento } from './entities/Deslocamento'
import { Grimorio } from './entities/Grimorio'
import { Magia } from './entities/Magia'
import { Pericia } from './entities/Pericia'
import { Personagem } from './entities/Personagem'
import { Poder } from './entities/Poder'
import { Proficiencia } from './entities/Proficiencia'
import { Recurso } from './entities/Recurso'
import { SubEfeito } from './entities/SubEfeito'
import { Tag } from './entities/Tag'
import { Progressao } from './entities/Progressao'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/UserData/db.sqlite',
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
  entities: [
    AprimoramentoMagia,
    Atributo,
    Bonus,
    Classe,
    Dano,
    Deslocamento,
    Grimorio,
    Magia,
    Pericia,
    Personagem,
    Progressao,
    Poder,
    Proficiencia,
    Recurso,
    SubEfeito,
    Tag
  ]
})
