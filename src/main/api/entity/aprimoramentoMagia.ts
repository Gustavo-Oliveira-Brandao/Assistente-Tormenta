import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IAprimoramentoMagia } from '../@types/t20/AprimoramentoMagia'
import { Magia } from './magia'

@Entity()
export class AprimoramentoMagia implements IAprimoramentoMagia {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'integer',
    nullable: false
  })
  custo: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1000
  })
  descricao: string

  @ManyToOne(() => Magia, (magia) => magia.aprimoramentos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  magia: Magia
}
