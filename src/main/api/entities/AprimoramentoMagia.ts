import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Magia } from './Magia'

@Entity()
export class AprimoramentoMagia {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  custo: number

  @Column({
    type: 'varchar',
    length: 1000
  })
  descricao: string

  @ManyToOne(() => Magia, (magia) => magia.aprimoramentos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  magia: Magia
}
