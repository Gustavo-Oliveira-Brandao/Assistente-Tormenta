import { SQLiteDataSource } from './data-source'
import './controllers/PersonagemController'

const AppDataSource = SQLiteDataSource

AppDataSource.initialize()
  .then(() => {
    console.log('Iniciado')
  })
  .catch((err) => {
    console.error(err)
  })
