import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Bonus } from './Bonus'
import { Personagem } from './Personagem'

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
    type: 'integer',
    nullable: true
  })
  valorTemporario: number

  @Column({
    type: 'varchar',
    nullable: true
  })
  atributo: string

  @OneToMany(() => Bonus, (bonus) => bonus.recurso, {
    cascade: true,
    nullable: true
  })
  bonus: Bonus[]

  @ManyToOne(() => Personagem, (personagem) => personagem.recursos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
