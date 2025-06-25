import { z } from 'zod'

export const atributoSchema = z
  .object({
    valorBase: z.coerce.number(),
    bonus: z.coerce.number()
  })
  .required()
