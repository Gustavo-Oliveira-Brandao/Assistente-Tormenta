import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Poder } from './Poder'
import { Personagem } from './Personagem'

//OK
@Entity()
export class Nivel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  classe: string

  @Column({
    type: 'integer'
  })
  valor: number

  @OneToMany(() => Poder, (poderes) => poderes.nivel, {
    cascade: true,
    nullable: true
  })
  poderes?: Poder[]

  @ManyToOne(() => Personagem, (personagem) => personagem.niveis, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
