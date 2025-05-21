import { SQLiteDataSource } from './data-source'
import './controllers/AtributoController'
import './controllers/ClasseController'
import './controllers/DeslocamentoController'
import './controllers/MagiaController'
import './controllers/PericiaController'
import './controllers/PoderController'
import './controllers/ProficienciaController'
import './controllers/RacaController'
import './controllers/RecursoController'
import './controllers/PersonagemController'
const AppDataSource = SQLiteDataSource

AppDataSource.initialize()
  .then(() => {
    console.log('Iniciado')
  })
  .catch((err) => {
    console.error(err)
  })
