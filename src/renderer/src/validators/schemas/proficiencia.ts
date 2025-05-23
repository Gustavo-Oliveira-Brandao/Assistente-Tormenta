import { z } from 'zod'

export const proficienciaSchema = z
  .object({
    categoria: z.string().nonempty('Campo obrigatório!'),
    nome: z.string().nonempty('Campo obrigatório!')
  })
  .required()
