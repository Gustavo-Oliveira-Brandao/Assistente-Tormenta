import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Poder } from './poder'
import { ITag } from '../@types/t20/Tag'

@Entity()
export class Tag implements ITag {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  label: string

  @ManyToOne(() => Poder, (poder) => poder.tags)
  poder: Poder
}
