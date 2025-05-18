import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IClasse } from '../@types/T20 GOTY/IClasse'
import { Progressao } from './Progressao'
import { IProgressao } from '../@types/T20 GOTY/IProgressao'
import { Personagem } from './Personagem'
import { Poder } from './Poder'
import { IPoder } from '../@types/T20 GOTY/IPoder'

@Entity()
export class Classe implements IClasse {
  @PrimaryGeneratedColumn({
    type: 'integer'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 30
  })
  nome: string

  @Column({
    type: 'integer',
    nullable: false
  })
  nivel: number

  @Column({
    type: 'integer',
    nullable: false
  })
  vidaInicial: number

  @Column({
    type: 'integer',
    nullable: false
  })
  vidaPorNivel: number

  @Column({
    type: 'integer',
    nullable: false
  })
  manaPorNivel: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 15
  })
  progressaoConjuracao: string

  @OneToMany(() => Progressao, (progressao) => progressao.classe, {
    cascade: true,
    nullable: false
  })
  progressao: IProgressao[]

  @OneToMany(() => Poder, (poderes) => poderes.classe, {
    cascade: true,
    nullable: false
  })
  poderesClasse: IPoder[]

  @ManyToOne(() => Personagem, (personagem) => personagem.classes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
