import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

@Entity()
export class Efeito {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'boolean'
  })
  estaAtivo: boolean

  @Column({
    type: 'varchar'
  })
  fonte: string

  @OneToMany(() => Modificador, (mod) => mod.efeito, {
    cascade: true,
    eager: true
  })
  modificadores: Modificador[]

  @ManyToOne(() => Personagem, (personagem) => personagem.efeitos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}

@Entity()
export class Modificador {
  @PrimaryGeneratedColumn()
  id: number

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

  @ManyToOne(() => Efeito, (efeito) => efeito.modificadores, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @Index()
  efeito: Efeito
}
