import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Poder } from './poder'
import { IExtra } from '../@types/t20/Extra'

@Entity()
export class Extra implements IExtra {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  titulo: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  texto: string

  @ManyToOne(() => Poder, (poder) => poder.extras, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  poder: Poder
}
