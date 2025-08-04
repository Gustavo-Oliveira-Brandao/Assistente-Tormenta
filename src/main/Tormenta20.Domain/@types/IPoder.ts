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
