import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Bonus } from './Bonus'
import { Personagem } from './Personagem'

@Entity()
export class Pericia {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 50
  })
  nome: string

  @Column({
    type: 'varchar',
    length: 15
  })
  treinamento: string

  @Column({
    type: 'varchar',
    length: 20
  })
  categoria: string

  @Column({
    type: 'varchar',
    length: 20
  })
  atributo: string

  @Column({
    type: 'boolean'
  })
  requerTreinamento: boolean

  @Column({
    type: 'boolean'
  })
  sofrePenalidadeArmadura: boolean

  @OneToMany(() => Bonus, (bonus) => bonus.pericia, {
    cascade: true,
    nullable: true,
    eager: true
  })
  bonus: Bonus[]

  @ManyToOne(() => Personagem, (personagem) => personagem.pericias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
