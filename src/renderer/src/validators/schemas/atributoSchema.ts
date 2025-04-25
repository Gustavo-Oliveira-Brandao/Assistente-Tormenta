import { z } from 'zod'
import { bonusSchema } from './bonusSchema'

export const atributoSchema = z
  .object({
    nome: z.string().nonempty('Nome do atributo não pode ser vazio'),
    valor: z.coerce.number(),
    bonus: z.array(bonusSchema),
    ordem: z.coerce.number()
  })
  .required()
