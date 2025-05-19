import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Classe } from './Classe'
import { Poder } from './Poder'

@Entity()
export class Progressao {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  nivel: number

  @OneToMany(() => Poder, (poderes) => poderes.progressao, {
    cascade: true
  })
  poderes: Poder[]

  @ManyToOne(() => Classe, (classe) => classe.progressao, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  classe: Classe
}
