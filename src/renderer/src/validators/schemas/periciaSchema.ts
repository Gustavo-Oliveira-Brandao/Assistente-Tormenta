import { z } from 'zod'
import { bonusSchema } from './bonusSchema'

export const periciaSchema = z
  .object({
    treinamento: z.coerce.string(),
    atributo: z.coerce.string().nonempty('Atributo não pode ser vazio'),
    bonus: z.array(bonusSchema)
  })
  .required()
