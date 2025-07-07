import { z } from 'zod'
import { modificadorSchema } from './modificador'

export const efeitoSchema = z
  .object({
    nome: z.string().nonempty('Campo obrigatório!'),
    estaAtivo: z.coerce.boolean(),
    modificadores: z.array(modificadorSchema)
  })
  .required()
