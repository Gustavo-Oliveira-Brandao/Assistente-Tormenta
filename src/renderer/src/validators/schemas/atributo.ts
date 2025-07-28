import { z } from 'zod'

export const atributoSchema = z
  .object({
    valorBase: z.coerce.number(),
    descricao: z.string(),
    bonus: z.coerce.number()
  })
  .required()
