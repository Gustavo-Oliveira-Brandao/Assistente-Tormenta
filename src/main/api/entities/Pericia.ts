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
  key: string

  @Column({
    type: 'varchar',
    length: 50
  })
  nome: string

  @Column({
    type: 'integer',
    nullable: false
  })
  bonus: number

  @Column({
    type: 'varchar',
    length: 15
  })
  treinamento: string

  @Column({
    type: 'varchar',
    length: 20
  })
  categoria: string

  @Column({
    type: 'varchar',
    length: 20
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
