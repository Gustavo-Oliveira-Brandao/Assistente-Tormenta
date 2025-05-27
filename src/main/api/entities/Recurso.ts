import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Bonus } from './Bonus'
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

  @OneToMany(() => Bonus, (bonus) => bonus.recurso, {
    cascade: true,
    nullable: true,
    eager: true
  })
  bonus?: Bonus[]

  @ManyToOne(() => Personagem, (personagem) => personagem.recursos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
