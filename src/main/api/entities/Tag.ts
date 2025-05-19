import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Poder } from './Poder'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100
  })
  label: string

  @ManyToOne(() => Poder, (poder) => poder.tags, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  poder: Poder
}
