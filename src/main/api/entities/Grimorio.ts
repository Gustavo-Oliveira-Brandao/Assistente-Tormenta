import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Bonus } from './Bonus'
import { Personagem } from './Personagem'
import { MagiaRef } from './MagiaRef'

//OK
@Entity()
export class Grimorio {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'varchar',
    length: 20
  })
  tradicao: string

  @Column({
    type: 'varchar',
    length: 20
  })
  atributoChave: string

  @OneToMany(() => Bonus, (bonus) => bonus.grimorio, {
    cascade: true,
    nullable: true
  })
  bonusCD?: Bonus[]

  @OneToMany(() => MagiaRef, (magia) => magia.grimorio, {
    cascade: true,
    nullable: true,
    eager: true
  })
  magias?: MagiaRef[]

  @ManyToOne(() => Personagem, (personagem) => personagem.grimorios, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
