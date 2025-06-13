import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Grimorio } from './Grimorio'

//OK
@Entity()
export class MagiaRef {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  key: number

  @ManyToOne(() => Grimorio, (grimorio) => grimorio.magias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  grimorio: Grimorio
}
