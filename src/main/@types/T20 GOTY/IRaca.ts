import { Prisma } from '@prisma/client'

/* eslint-disable @typescript-eslint/no-unused-vars */
export type IRacaPersonagem = {
  id: number
  key: string
  nome: string
  tipo: string
  descricao: string
  racaAtributos: IRacaAtributo[]
}

export type IRacaAtributo = {
  id: number
  atributo: string
  valor: number
}

const racaPut = Prisma.validator<Prisma.RacaDefaultArgs>()({
  include: {
    racaAtributos: true
  }
})

export type IRacaRequestPutDTO = Prisma.RacaGetPayload<typeof racaPut>
