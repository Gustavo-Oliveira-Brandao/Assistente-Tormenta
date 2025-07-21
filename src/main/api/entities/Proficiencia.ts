import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

//OK
@Entity()
export class Proficiencia {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  categoria: string

  @Column({
    type: 'varchar'
  })
  nome: string

  @ManyToOne(() => Personagem, (personagem) => personagem.proficiencias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @Index()
  personagem: Personagem
}
