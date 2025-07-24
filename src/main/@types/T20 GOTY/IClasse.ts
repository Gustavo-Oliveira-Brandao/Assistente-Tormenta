import { Prisma } from '@prisma/client'

/* eslint-disable @typescript-eslint/no-unused-vars */
export type IClasse = {
  key: string
  nome: string
  icone: string
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  devotoFiel: boolean
  pericias: string[]
  numeroPericiasExtras: number
  periciasExtras: string[]
  proficiencias: {
    categoria: string
    nome: string
  }[]
}

export type IClassePersonagem = {
  id: number
  nome: string
  nivel: number
  descricao: string
  vidaInicial: number
  vidaPorNivel: number
  manaPorNivel: number
  devotoFiel: boolean
  habilidades: IClasseHabilidade[]
}

export type IClasseHabilidade = {
  id: number
  key: string
  nivel: number
}

export type IClasseRequestPostDTO = {
  key: string
  nome: string
  descricao: string
  nivel: number
  vidaInicial: number
  vidaPorNivel: number
  devotoFiel: boolean
  manaPorNivel: number
  habilidades: {
    key: string
    nivel: number
  }[]
}

const classePersonagemPut = Prisma.validator<Prisma.ClasseDefaultArgs>()({
  include: {
    habilidades: true
  }
})

export type IClasseRequestPutDTO = Prisma.ClasseGetPayload<typeof classePersonagemPut>
