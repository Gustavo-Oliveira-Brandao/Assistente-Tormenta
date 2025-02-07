import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Poder } from './poder'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar'
  })
  label: string

  @ManyToOne(() => Poder, (poder) => poder.tags)
  poder: Poder
}
