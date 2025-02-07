import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Poder } from './poder'

@Entity()
export class Topico {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar'
  })
  titulo: string

  @Column({
    type: 'varchar'
  })
  texto: string

  @ManyToOne(() => Poder, (poder) => poder.topicos)
  poder: Poder
}
