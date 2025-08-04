/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'

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
