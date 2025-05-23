import { z } from 'zod'

export const grimorioSchema = z.object({
  tradicao: z.string().nonempty('Campo obrigatório!'),
  atributoChave: z.string().nonempty('Campo obrigatório!')
})
