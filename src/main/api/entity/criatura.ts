import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Recurso } from './recurso'
import { Atributo } from './atributo'
import { Pericia } from './pericia'
import { Poder } from './poder'
import { ItemT20 } from './item'
import { Magia } from './magia'
import { ICriatura } from '../@types/t20/Criatura'
import { IPoder } from '../@types/t20/Poder'
import { IItemInventario } from '../@types/t20/Item'
import { IMagia } from '../@types/t20/Magia'

@Entity()
export class Criatura implements ICriatura {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  nome: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  tipoCriatura: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  categoria: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  raca: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  classe: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  origem: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  divindade: string

  @Column({
    type: 'integer',
    nullable: false
  })
  nivel: number

  @Column({
    type: 'integer',
    nullable: true
  })
  experiencia: number

  @Column({
    type: 'integer',
    nullable: true
  })
  penalidadeArmadura?: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  tamanho: string

  @Column({
    type: 'varchar',
    nullable: true
  })
  alinhamento: string

  @OneToMany(() => Recurso, (recursos) => recursos.personagem, {
    cascade: true,
    eager: true,
    nullable: false
  })
  recursos: Recurso[]

  @OneToMany(() => Atributo, (atributos) => atributos.personagem, {
    cascade: true,
    eager: true,
    nullable: false
  })
  atributos: Atributo[]

  @OneToMany(() => Pericia, (pericias) => pericias.personagem, {
    cascade: true,
    eager: true,
    nullable: false
  })
  pericias: Pericia[]

  @OneToMany(() => Poder, (poderes) => poderes.personagem, {
    cascade: true,
    eager: true,
    nullable: true
  })
  poderes: IPoder[]

  @OneToMany(() => ItemT20, (itens) => itens.personagem, {
    cascade: true,
    eager: true,
    nullable: true
  })
  itens: IItemInventario[]

  @OneToMany(() => Magia, (magias) => magias.personagem, {
    cascade: true,
    eager: false,
    nullable: true
  })
  magias: IMagia[]
}
