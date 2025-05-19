import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

@Entity()
export class Proficiencia {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 50
  })
  categoria: string

  @Column({
    type: 'varchar',
    length: 100
  })
  nome: string

  @ManyToOne(() => Personagem, (personagem) => personagem.proficiencias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
