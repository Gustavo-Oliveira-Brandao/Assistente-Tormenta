import { z } from 'zod'

export const periciaSchema = z.object({
  ehTreinado: z.coerce.boolean(),
  atributo: z.coerce.string(),
  requerTreinamento: z.coerce.boolean(),
  sofrePenalidadeArmadura: z.coerce.boolean()
})
