import { z } from 'zod'

export const atributoSchema = z
  .object({
    valor: z.coerce.number(),
    bonus: z.coerce.number()
  })
  .required()
