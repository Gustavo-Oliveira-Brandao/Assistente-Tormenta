import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ISubEfeito } from '../@types/T20 GOTY/ISubEfeito'
import { Poder } from './Poder'

@Entity()
export class SubEfeito implements ISubEfeito {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  nome: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1000
  })
  descricao: string

  @ManyToOne(() => Poder, (poder) => poder.subEfeitos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  poder: Poder
}
