import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Personagem } from './personagem'

@Entity()
export class Pericia {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'boolean'
  })
  ehTreinado: boolean

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

  @Column({
    type: 'varchar'
  })
  descricao: string

  @ManyToOne(() => Personagem, (personagem) => personagem.pericias)
  personagem: Personagem
}
