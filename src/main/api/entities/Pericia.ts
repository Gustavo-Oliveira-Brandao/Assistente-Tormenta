import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './Personagem'

//OK
@Entity()
export class Pericia {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'integer',
    nullable: false
  })
  bonus: number

  @Column({
    type: 'varchar'
  })
  treinamento: string

  @Column({
    type: 'varchar'
  })
  categoria: string

  @Column({
    type: 'varchar'
  })
  atributo: string

  @Column({
    type: 'boolean'
  })
  requerTreinamento: boolean

  @Column({
    type: 'boolean'
  })
  sofrePenalidadeArmadura: boolean

  @ManyToOne(() => Personagem, (personagem) => personagem.pericias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @Index()
  personagem: Personagem
}
