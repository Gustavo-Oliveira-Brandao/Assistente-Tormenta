import { z } from 'zod'

export const periciaSchema = z
  .object({
    nome: z.string().nonempty('Campo obrigatório!'),
    ehTreinado: z.coerce.boolean(),
    categoria: z.string().nonempty('Campo obrigatório!'),
    atributo: z.string().nonempty('Campo obrigatório!'),
    requerTreinamento: z.coerce.boolean(),
    sofrePenalidadeArmadura: z.coerce.boolean(),
    bonus: z.coerce.number()
  })
  .required()
