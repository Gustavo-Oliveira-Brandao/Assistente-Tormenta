import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Bonus } from './Bonus'

@Entity()
export class Dano {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  quantidade: number

  @Column({
    type: 'integer'
  })
  dado: number

  @Column({
    type: 'varchar',
    length: 50
  })
  tipo: string

  @Column({
    type: 'boolean'
  })
  aplicaModificador: boolean

  @Column({
    type: 'varchar',
    length: 20
  })
  atributo: string

  @OneToMany(() => Bonus, (bonus) => bonus.dano, {
    cascade: true,
    nullable: true
  })
  bonus?: Bonus[]
}
