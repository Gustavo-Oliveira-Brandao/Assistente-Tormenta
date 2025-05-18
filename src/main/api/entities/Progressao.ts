import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IProgressao } from '../@types/T20 GOTY/IProgressao'
import { Classe } from './Classe'
import { Poder } from './Poder'
import { IPoder } from '../@types/T20 GOTY/IPoder'

@Entity()
export class Progressao implements IProgressao {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'integer',
    nullable: false
  })
  nivel: number

  @OneToMany(() => Poder, (poderes) => poderes.progressao, {
    cascade: true,
    nullable: false
  })
  poderes: IPoder[]

  @ManyToOne(() => Classe, (classe) => classe.progressao, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  classe: Classe
}
