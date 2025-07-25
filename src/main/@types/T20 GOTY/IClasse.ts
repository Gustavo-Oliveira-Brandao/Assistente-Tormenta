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

const classePersonagemPost = Prisma.validator<Prisma.ClasseDefaultArgs>()({
  select: {
    key: true,
    nome: true,
    descricao: true,
    nivel: true,
    vidaInicial: true,
    vidaPorNivel: true,
    devotoFiel: true,
    manaPorNivel: true
  },
  include: {
    habilidades: {
      select: {
        key: true,
        nivel: true
      }
    }
  }
})

export type IClasseRequestPostDTO = Prisma.ClasseGetPayload<typeof classePersonagemPost>

const classePersonagemPut = Prisma.validator<Prisma.ClasseDefaultArgs>()({
  include: {
    habilidades: true
  }
})

export type IClasseRequestPutDTO = Prisma.ClasseGetPayload<typeof classePersonagemPut>
