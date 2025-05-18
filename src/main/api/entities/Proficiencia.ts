import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IProficiencia } from '../@types/T20 GOTY/IProficiencia'
import { Personagem } from './Personagem'

@Entity()
export class Proficiencia implements IProficiencia {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  categoria: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  nome: string

  @ManyToOne(() => Personagem, (personagem) => personagem.proficiencias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
