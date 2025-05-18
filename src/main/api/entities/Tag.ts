import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ITag } from '../@types/T20 GOTY/ITag'
import { Poder } from './Poder'

@Entity()
export class Tag implements ITag {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  label: string

  @ManyToOne(() => Poder, (poder) => poder.tags, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  poder: Poder
}
