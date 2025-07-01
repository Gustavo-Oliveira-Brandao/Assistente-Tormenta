import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

//OK
@Entity()
export class Recurso {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 50
  })
  categoria: string

  @Column({
    type: 'integer'
  })
  valorAtual: number

  @Column({
    type: 'integer'
  })
  valorTemporario: number

  @Column({
    type: 'varchar'
  })
  atributo: string

  @ManyToOne(() => Personagem, (personagem) => personagem.recursos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
    @Index()
  personagem: Personagem
}
