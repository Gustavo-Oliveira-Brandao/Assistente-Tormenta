import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Atributo } from './Atributo'
import { Pericia } from './Pericia'
import { Deslocamento } from './Deslocamento'
import { Recurso } from './Recurso'
import { Grimorio } from './Grimorio'
import { Dano } from './Dano'

@Entity()
export class Bonus {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100
  })
  label: string

  @Column({
    type: 'integer'
  })
  valor: number

  @Column({
    type: 'boolean'
  })
  estaAtivo: boolean

  @Column({
    type: 'boolean'
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

  @ManyToOne(() => Deslocamento, (deslocamento) => deslocamento.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  deslocamento: Deslocamento

  @ManyToOne(() => Recurso, (recurso) => recurso.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  recurso: Recurso

  @ManyToOne(() => Grimorio, (grimorio) => grimorio.bonusCD, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  grimorio: Grimorio

  @ManyToOne(() => Dano, (dano) => dano.bonus, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  dano: Dano
}
