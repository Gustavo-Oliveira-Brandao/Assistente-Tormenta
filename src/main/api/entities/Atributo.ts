import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Bonus } from './Bonus'
import { Personagem } from './Personagem'

@Entity()
export class Atributo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 20
  })
  nome: string

  @Column({
    type: 'integer',
    nullable: false
  })
  valorBase: number

  @Column({
    type: 'integer',
    nullable: false
  })
  ordem: number

  @OneToMany(() => Bonus, (bonus) => bonus.atributo, {
    cascade: true,
    nullable: true,
    eager: true
  })
  bonus: Bonus[]

  @ManyToOne(() => Personagem, (personagem) => personagem.atributos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
