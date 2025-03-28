import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IBonus } from '../@types/t20/Bonus'
import { Atributo } from './atributo'
import { Pericia } from './pericia'
import { Defesa } from './defesa'
import { Dano } from './dano'
import { Vida } from './vida'
import { Mana } from './mana'

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

  @ManyToOne(() => Defesa, (defesa) => defesa.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  defesa: Defesa

  @ManyToOne(() => Dano, (dano) => dano.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  dano: Dano

  @ManyToOne(() => Vida, (vida) => vida.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  vida: Vida

  @ManyToOne(() => Mana, (mana) => mana.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  mana: Mana
}
