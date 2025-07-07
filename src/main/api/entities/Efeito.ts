import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Modificador } from './Modificador'
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
