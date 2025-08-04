/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'

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
