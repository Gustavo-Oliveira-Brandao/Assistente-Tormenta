import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number

  // Pontos de Vida (PV)
  @Column({
    type: 'integer'
  })
  vidaAtual: number

  @Column({
    type: 'integer',
    nullable: false
  })
  vidaMaximaBonus: number

  @Column({
    type: 'integer'
  })
  vidaTemporaria: number

  @Column({
    type: 'varchar'
  })
  atributoVidaMaxima: string

  // Pontos de Mana (PM)
  @Column({
    type: 'integer'
  })
  manaAtual: number

  @Column({
    type: 'integer',
    nullable: false
  })
  manaMaximaBonus: number

  @Column({
    type: 'integer'
  })
  manaTemporaria: number

  @Column({
    type: 'varchar'
  })
  atributoManaMaxima: string

  // Defesa
  @Column({
    type: 'integer'
  })
  defesaBase: number

  @Column({
    type: 'integer',
    nullable: false
  })
  defesaBonus: number

  @Column({
    type: 'varchar'
  })
  atributoDefesa: string

  @OneToOne(() => Personagem, (personagem) => personagem.status, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  personagem: Personagem
}
