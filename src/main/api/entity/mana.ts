import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IRecurso } from '../@types/t20/Recurso'

@Entity()
export class Mana implements IRecurso {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'integer',
    nullable: false
  })
  valorAtual: number

  @Column({
    type: 'integer',
    nullable: false
  })
  valorBase: number

  @Column({
    type: 'integer',
    nullable: false
  })
  valorPorNivel: number

  @Column({
    type: 'integer',
    nullable: false
  })
  valorTemporario: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  atributo: string
}
