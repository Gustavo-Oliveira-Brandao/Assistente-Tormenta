import { z } from 'zod'

export const defesaSchema = z.object({
  armadura: z.coerce.number(),
  escudo: z.coerce.number(),
  temporario: z.coerce.number(),
  atributo: z.coerce.string().nonempty('Atributo não pode ser vazio'),
  penalidadeArmaduraTotal: z.coerce.number()
})
