import { z } from 'zod'
import { bonusSchema } from './bonus'

export const atributoSchema = z
  .object({
    nome: z.string().nonempty('Campo obrigatório!'),
    valorBase: z.coerce.number(),
    bonus: z.array(bonusSchema),
    ordem: z.coerce.number()
  })
  .required()
