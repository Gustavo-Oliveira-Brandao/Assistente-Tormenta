import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

//OK
@Entity()
export class Deslocamento {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 20
  })
  nome: string

  @Column({
    type: 'integer'
  })
  valorBase: number

  @ManyToOne(() => Personagem, (personagem) => personagem.deslocamentos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @Index()
  personagem: Personagem
}
