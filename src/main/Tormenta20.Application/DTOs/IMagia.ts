/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'

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
