/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'

const proficienciaPost = Prisma.validator<Prisma.ProficienciaDefaultArgs>()({
  select: {
    categoria: true,
    nome: true
  }
})

export type IProficienciaPostRequestDTO = Prisma.ProficienciaGetPayload<typeof proficienciaPost>
