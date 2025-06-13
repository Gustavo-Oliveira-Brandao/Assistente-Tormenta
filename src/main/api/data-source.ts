import { DataSource } from 'typeorm'
import { Atributo } from './entities/Atributo'
import { Bonus } from './entities/Bonus'
import { Dano } from './entities/Dano'
import { Deslocamento } from './entities/Deslocamento'
import { Grimorio } from './entities/Grimorio'
import { Pericia } from './entities/Pericia'
import { Personagem } from './entities/Personagem'
import { Proficiencia } from './entities/Proficiencia'
import { Recurso } from './entities/Recurso'
import { MagiaRef } from './entities/MagiaRef'
import { PoderRef } from './entities/PoderRef'
import { ClassePersonagem } from './entities/ClassePersonagem'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/UserData/db.sqlite',
  synchronize: true,
  entities: [
    Atributo,
    Bonus,
    Dano,
    ClassePersonagem,
    Deslocamento,
    Grimorio,
    MagiaRef,
    Pericia,
    Personagem,
    PoderRef,
    Proficiencia,
    Recurso
  ]
})
