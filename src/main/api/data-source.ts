import { DataSource } from 'typeorm'
import { Atributo } from './entity/atributo'
import { Pericia } from './entity/pericia'
import { Criatura } from './entity/criatura'
import { Poder } from './entity/poder'
import { Tag } from './entity/tag'
import { Extra } from './entity/extra'
import { ItemT20 } from './entity/item'
import { Dano } from './entity/dano'
import { Magia } from './entity/magia'
import { AprimoramentoMagia } from './entity/aprimoramentoMagia'
import { Bonus } from './entity/bonus'
import { Recurso } from './entity/recurso'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/userData/db.sqlite',
  entities: [
    Criatura,
    Atributo,
    Pericia,
    Poder,
    Extra,
    Tag,
    ItemT20,
    Dano,
    Magia,
    AprimoramentoMagia,
    Recurso,
    Bonus
  ],
  synchronize: true,
  logging: true,
  logger: 'advanced-console'
})
