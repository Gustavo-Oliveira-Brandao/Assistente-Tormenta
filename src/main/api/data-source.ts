import { DataSource } from 'typeorm'

export const SQLiteDataSource = new DataSource({
  type: 'sqlite',
  database: './src/main/UserData/db.sqlite',
  synchronize: true,
  logging: true,
  logger: 'advanced-console'
})
