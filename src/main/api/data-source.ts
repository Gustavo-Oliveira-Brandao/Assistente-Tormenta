import { DataSource } from 'typeorm'
import { Atributo } from './entities/Atributo'
import { Deslocamento } from './entities/Deslocamento'
import { Pericia } from './entities/Pericia'
import { Classe, DetalhesAmeaca, DetalhesPJ, Personagem } from './entities/Personagem'
import { Proficiencia } from './entities/Proficiencia'
import { Poder, SubEfeito, Tag } from './entities/Poder'
import { AprimoramentoMagia, Grimorio, Magia } from './entities/Magia'
import { Status } from './entities/Status'
import { Efeito, Modificador } from './entities/Efeito'
import {
  Armadura,
  Ataque,
  Equipamento,
  Inventario,
  Propriedade,
  Resistencia
} from './entities/Inventario'
import { Rolagem } from './entities/Rolagem'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/UserData/db.sqlite',
  synchronize: true,
  entities: [
    Atributo,
    Rolagem,
    Classe,
    Poder,
    Tag,
    DetalhesAmeaca,
    Modificador,
    DetalhesPJ,
    SubEfeito,
    Efeito,
    Deslocamento,
    Grimorio,
    Equipamento,
    Inventario,
    Propriedade,
    Ataque,
    Resistencia,
    Armadura,
    Magia,
    Pericia,
    AprimoramentoMagia,
    Personagem,
    Proficiencia,
    Status
  ]
})
