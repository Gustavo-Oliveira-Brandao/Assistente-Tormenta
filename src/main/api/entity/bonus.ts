import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IBonus } from '../@types/t20/Bonus'
import { Atributo } from './atributo'
import { Pericia } from './pericia'
import { Dano } from './dano'
import { Recurso } from './recurso'

@Entity()
export class Bonus implements IBonus {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  label: string

  @Column({
    type: 'integer',
    nullable: false
  })
  valor: number

  @Column({
    type: 'boolean',
    nullable: false
  })
  estaAtivo: boolean

  @Column({
    type: 'boolean',
    nullable: false
  })
  ehPorNivel: boolean

  @ManyToOne(() => Atributo, (atributo) => atributo.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  atributo: Atributo

  @ManyToOne(() => Pericia, (pericia) => pericia.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  pericia: Pericia

  @ManyToOne(() => Dano, (dano) => dano.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  dano: Dano

  @ManyToOne(() => Recurso, (recurso) => recurso.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  recurso: Recurso
}
