import { SQLiteDataSource } from './data-source'
import './controllers/AtributoController'
import './controllers/PericiaController'
import './controllers/PersonagemController'
import './controllers/PoderController'
import './controllers/RecursoController'
import './controllers/MagiaController'

const AppDataSource = SQLiteDataSource

AppDataSource.initialize()
  .then(() => {
    console.log('Iniciado')
  })
  .catch((err) => {
    console.error(err)
  })
