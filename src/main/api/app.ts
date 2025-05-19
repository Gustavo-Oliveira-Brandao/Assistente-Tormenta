import { SQLiteDataSource } from './data-source'

const AppDataSource = SQLiteDataSource

AppDataSource.initialize()
  .then(() => {
    console.log('Iniciado')
  })
  .catch((err) => {
    console.error(err)
  })
