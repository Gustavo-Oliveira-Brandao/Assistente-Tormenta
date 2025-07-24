/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'

export type IProficiencia = {
  id: number
  categoria: string
  nome: string
}

const proficienciaPost = Prisma.validator<Prisma.ProficienciaDefaultArgs>()({
  select: {
    categoria: true,
    nome: true
  }
})

export type IProficienciaPostRequestDTO = Prisma.ProficienciaGetPayload<typeof proficienciaPost>
