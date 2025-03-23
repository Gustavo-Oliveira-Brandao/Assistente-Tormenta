import { SQLiteDataSource } from './data-source'
import './controllers/AtributoController'
import './controllers/DefesaController'
import './controllers/DeslocamentoController'
import './controllers/PericiaController'
import './controllers/PersonagemController'
import './controllers/PoderController'
import './controllers/RecursoController'

const AppDataSource = SQLiteDataSource

AppDataSource.initialize()
  .then(() => {
    console.log('Iniciado')
  })
  .catch((err) => {
    console.error(err)
  })
