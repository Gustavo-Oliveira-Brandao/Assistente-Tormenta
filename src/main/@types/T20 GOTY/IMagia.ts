/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'

export type IGrimorio = {
  id: number
  atributoChaveMagias: string
  bonusCD: number
  magias: IMagia[]
}

export type IMagia = {
  id: number
  key: string
  nome: string
  alvo: string
  area: string
  efeito: string
  execucao: string
  resistencia: string
  descricao: string
  duracao: string
  nivelCirculo: number
  alcance: string
  tradicao: string
  publicacao: string
  escola: string
  aprimoramentos: IAprimoramentoMagia[]
}

export type IAprimoramentoMagia = {
  id: number
  custo: number
  descricao: string
}

const magiaPost = Prisma.validator<Prisma.MagiaDefaultArgs>()({
  select: {
    key: true,
    nome: true,
    alvo: true,
    area: true,
    efeito: true,
    execucao: true,
    resistencia: true,
    descricao: true,
    duracao: true,
    nivelCirculo: true,
    alcance: true,
    tradicao: true,
    publicacao: true,
    escola: true
  },
  include: {
    aprimoramentos: {
      select: {
        custo: true,
        descricao: true
      }
    }
  }
})

export type IMagiaPostRequestDTO = Prisma.MagiaGetPayload<typeof magiaPost>
