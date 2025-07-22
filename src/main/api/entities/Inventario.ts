import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  bonusLimiteCarga: number

  @Column({
    type: 'integer'
  })
  limiteItensVestidos: number

  @Column({
    type: 'integer'
  })
  limiteCargaEstaAtivo: number

  @Column({ type: 'boolean' })
  limiteItensVestidosEstaAtivo: boolean

  @Column({ type: 'integer' })
  tibarCobre: number

  @Column({ type: 'integer' })
  tibarOuro: number

  @Column({ type: 'integer' })
  tibar: number

  @OneToMany(() => Equipamento, (equipamento) => equipamento.inventario, {
    cascade: true,
    eager: true
  })
  equipamentos: Equipamento[]
}

@Entity()
export class Equipamento {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  key: string

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'varchar',
    length: 5000
  })
  descricao: string

  @Column({
    type: 'varchar'
  })
  categoria: string

  @Column({
    type: 'boolean'
  })
  equipado: boolean

  @Column({
    type: 'varchar'
  })
  proficiencia: string

  @Column({
    type: 'integer'
  })
  espacos: number

  @Column({
    type: 'varchar',
    nullable: true
  })
  alcance?: string

  @Column({
    type: 'integer'
  })
  preco: number

  @Column({
    type: 'integer'
  })
  quantidade: number

  @Column({
    type: 'integer',
    nullable: true
  })
  vidaMaxima?: number

  @Column({
    type: 'integer',
    nullable: true
  })
  vidaAtual?: number

  @Column({
    type: 'integer',
    nullable: true
  })
  reducaoDano?: number

  @Column({
    type: 'varchar',
    nullable: true
  })
  empunhadura?: string

  @Column({
    type: 'integer',
    nullable: true
  })
  penalidadeArmadura?: number

  @Column({
    type: 'varchar'
  })
  publicacao: string

  @Column({
    type: 'varchar'
  })
  material: string

  @OneToOne(() => Ataque, (ataque) => ataque.equipamento, {
    cascade: true,
    eager: true
  })
  ataque: Ataque

  @OneToOne(() => Armadura, (armadura) => armadura.equipamento, {
    cascade: true,
    eager: true
  })
  armadura: Armadura

  @OneToOne(() => Armadura, (armadura) => armadura.equipamento, {
    cascade: true,
    eager: true
  })
  resistencia: Resistencia

  @OneToMany(() => Propriedade, (propriedade) => propriedade.equipamento, {
    cascade: true,
    eager: true
  })
  propriedades: Propriedade[]

  @ManyToOne(() => Inventario, (inventario) => inventario.equipamentos, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  inventario: Inventario
}

@Entity()
export class Ataque {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  proposito: string

  @Column({
    type: 'integer'
  })
  bonusAcerto: number

  @Column({
    type: 'varchar'
  })
  periciaAcerto: string

  @Column({
    type: 'varchar'
  })
  atributoDano: string

  @Column({
    type: 'integer'
  })
  margemCritico: number

  @Column({
    type: 'integer'
  })
  multiplicadorCritico: number

  @OneToOne(() => Equipamento, (equipamento) => equipamento.ataque, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  equipamento: Equipamento
}

@Entity()
export class Armadura {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer'
  })
  defesa: number

  @Column({
    type: 'integer'
  })
  bonus: number

  @Column({
    type: 'integer'
  })
  maxAtributoDefesa: number

  @OneToOne(() => Equipamento, (equipamento) => equipamento.armadura, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  equipamento: Equipamento
}

@Entity()
export class Propriedade {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  nome: string

  @Column({
    type: 'varchar'
  })
  categoria: string

  @ManyToOne(() => Equipamento, (equipamento) => equipamento.propriedades, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  equipamento: Equipamento
}

@Entity()
export class Resistencia {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
  })
  atributoCD: string

  @Column({
    type: 'varchar'
  })
  periciaCD: string

  @Column({
    type: 'integer',
    nullable: true
  })
  cdFixo?: number

  @Column({
    type: 'integer'
  })
  bonusCD: number

  @OneToOne(() => Equipamento, (equipamento) => equipamento.resistencia, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  equipamento: Equipamento
}
