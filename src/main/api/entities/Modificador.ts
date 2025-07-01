import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'
@Entity()
export class Modificador {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'varchar'
  })
  tipo: string

  @Column({
    type: 'varchar'
  })
  alvo: string

  @Column({
    type: 'varchar'
  })
  modoBonus: 'SOMA' | 'SUBSTITUICAO'

  @Column({
    type: 'integer'
  })
  valor: number

  @Column({
    type: 'boolean'
  })
  estaAtivo: boolean

  @Column({
    type: 'boolean'
  })
  ehPorNivel: boolean

  @ManyToOne(() => Personagem, (personagem) => personagem.modificadores, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @Index()
  personagem: Personagem
}
