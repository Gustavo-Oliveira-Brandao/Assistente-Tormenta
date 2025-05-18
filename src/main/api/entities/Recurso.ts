import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IRecurso } from '../@types/T20 GOTY/IRecurso'
import { Bonus } from './Bonus'
import { IBonus } from '../@types/T20 GOTY/IBonus'
import { Personagem } from './Personagem'

@Entity()
export class Recurso implements IRecurso {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
  })
  categoria: string

  @Column({
    type: 'integer',
    nullable: false
  })
  valorAtual: number

  @Column({
    type: 'integer',
    nullable: true
  })
  valorTemporario?: number

  @Column({
    type: 'varchar',
    nullable: true
  })
  atributo: string | null

  @OneToMany(() => Bonus, (bonus) => bonus.recurso, {
    cascade: true,
    nullable: true
  })
  bonus: IBonus[]

  @ManyToOne(() => Personagem, (personagem) => personagem.recursos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
