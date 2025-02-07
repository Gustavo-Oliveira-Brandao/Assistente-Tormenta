import { DataSource } from 'typeorm'
import { Personagem } from './entity/personagem'
import { Defesa } from './entity/defesa'
import { Deslocamento } from './entity/deslocamento'
import { Vida } from './entity/vida'
import { Mana } from './entity/mana'
import { Atributo } from './entity/atributo'
import { Pericia } from './entity/pericia'
import { Topico } from './entity/topico'
import { Tag } from './entity/tag'
import { Poder } from './entity/poder'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/userData/db.sqlite',
  logging: true,
  entities: [Personagem, Defesa, Deslocamento, Vida, Mana, Atributo, Pericia, Poder, Topico, Tag],
  synchronize: true
})

AppDataSource.initialize()
  .then(() => {
    console.log('Iniciado')
  })
  .catch((err) => {
    console.error(err)
  })
