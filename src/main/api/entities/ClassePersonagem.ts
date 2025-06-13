import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

@Entity()
export class ClassePersonagem {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'integer'
  })
  nivel: number

  @ManyToOne(() => Personagem, (personagem) => personagem.classes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
