import { z } from 'zod'
import { bonusSchema } from './bonus'

export const deslocamentoSchema = z
  .object({
    nome: z.string().nonempty('Campo obrigatório!'),
    valorBase: z.coerce.number().nonnegative('Deslocamento não pode ser negativo.'),
    bonus: z.array(bonusSchema)
  })
  .required()
