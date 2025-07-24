/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'

export type IPoder = {
  id: number
  key: string
  icone: string | null
  nome: string
  tempoExecucao: string
  descricao: string
  categoria: string
  fonte: string
  publicacao: string
  nivel: number
  preRequisitos: string
  subEfeitos: ISubEfeito[]
  tags: ITag[]
}

export type ITag = {
  id: number
  label: string
}

export type ISubEfeito = {
  id: number
  nome: string
  descricao: string
}

const poderPost = Prisma.validator<Prisma.PoderDefaultArgs>()({
  select: {
    key: true,
    icone: true,
    nome: true,
    tempoExecucao: true,
    descricao: true,
    categoria: true,
    fonte: true,
    publicacao: true,
    nivel: true,
    preRequisitos: true
  },
  include: {
    subEfeitos: {
      select: {
        nome: true,
        descricao: true
      }
    },
    tags: {
      select: {
        label: true
      }
    }
  }
})

export type IPoderPostRequestDTO = Prisma.PoderGetPayload<typeof poderPost>
