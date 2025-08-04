/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client'

const racaPut = Prisma.validator<Prisma.RacaDefaultArgs>()({
  include: {
    racaAtributos: true
  }
})

export type IRacaRequestPutDTO = Prisma.RacaGetPayload<typeof racaPut>
