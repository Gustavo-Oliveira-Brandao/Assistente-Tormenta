import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @Column({
    type: 'integer'
  })
  vidaInicial: number

  @Column({
    type: 'integer'
  })
  vidaPorNivel: number

  @Column({
    type: 'integer'
  })
  manaPorNivel: number

  @ManyToOne(() => Personagem, (personagem) => personagem.classes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @Index()
  personagem: Personagem
}
