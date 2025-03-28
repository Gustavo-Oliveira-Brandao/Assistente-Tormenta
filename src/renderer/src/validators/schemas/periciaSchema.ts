import { z } from 'zod'
import { bonusSchema } from './bonusSchema'

export const periciaSchema = z
  .object({
    treinamento: z.coerce.string(),
    atributo: z.coerce.string(),
    bonus: z.array(bonusSchema)
  })
  .required()
