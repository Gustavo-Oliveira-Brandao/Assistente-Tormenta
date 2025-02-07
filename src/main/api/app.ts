import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: './database/db.sqlite'
})

AppDataSource.initialize()
  .then(() => {
    console.log('Iniciado')
  })
  .catch((err) => {
    console.error(err)
  })
