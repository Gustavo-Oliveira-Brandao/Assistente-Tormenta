import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Poder } from './poder'
import { ITopico } from '../@types/t20/Topico'

@Entity()
export class Topico implements ITopico {
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

  @ManyToOne(() => Poder, (poder) => poder.topicos)
  poder: Poder
}
