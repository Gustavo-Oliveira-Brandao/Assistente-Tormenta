import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Bonus } from './Bonus'
import { Personagem } from './Personagem'

@Entity()
export class Deslocamento {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 20
  })
  nome: string

  @Column({
    type: 'integer'
  })
  valorBase: number

  @OneToMany(() => Bonus, (bonus) => bonus.deslocamento, {
    cascade: true,
    nullable: true,
    eager: true
  })
  bonus?: Bonus[]

  @ManyToOne(() => Personagem, (personagem) => personagem.deslocamentos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
