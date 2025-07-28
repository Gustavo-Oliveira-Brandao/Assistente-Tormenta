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
  tags: ITag[]
}

export type ITag = {
  id: number
  label: string
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
    publicacao: true
  },
  include: {
    tags: {
      select: {
        label: true
      }
    }
  }
})

export type IPoderPostRequestDTO = Prisma.PoderGetPayload<typeof poderPost>
