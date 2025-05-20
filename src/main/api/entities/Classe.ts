import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Progressao } from './Progressao'
import { Personagem } from './Personagem'
import { Poder } from './Poder'

@Entity()
export class Classe {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 30
  })
  nome: string

  @Column({
    type: 'integer'
  })
  nivel: number

  @Column({
    type: 'integer'
  })
  vidaInicial: number

  @Column({
    type: 'integer'
  })
  vidaPorNivel: number

  @Column({
    type: 'integer'
  })
  manaPorNivel: number

  @Column({
    type: 'varchar',
    length: 15
  })
  progressaoConjuracao: string

  @OneToMany(() => Progressao, (progressao) => progressao.classe, {
    cascade: true,
    eager: true
  })
  progressao: Progressao[]

  @OneToMany(() => Poder, (poderes) => poderes.classe, {
    cascade: true
  })
  poderesClasse: Poder[]

  @ManyToOne(() => Personagem, (personagem) => personagem.classes, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  personagem: Personagem
}
