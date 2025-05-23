import { z } from 'zod'
import { bonusSchema } from './bonus'

export const periciaSchema = z.object({
  nome: z.string().nonempty('Campo obrigatório!'),
  treinamento: z.string().nonempty('Campo obrigatório!'),
  categoria: z.string().nonempty('Campo obrigatório!'),
  atributo: z.string().nonempty('Campo obrigatório!'),
  requerTreinamento: z.coerce.boolean(),
  sofrePenalidadeArmadura: z.coerce.boolean(),
  bonus: z.array(bonusSchema)
}).required
