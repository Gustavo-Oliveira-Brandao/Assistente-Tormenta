import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Poder } from './Poder'

@Entity()
export class SubEfeito {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100
  })
  nome: string

  @Column({
    type: 'varchar',
    length: 1000
  })
  descricao: string

  @ManyToOne(() => Poder, (poder) => poder.subEfeitos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  poder: Poder
}
