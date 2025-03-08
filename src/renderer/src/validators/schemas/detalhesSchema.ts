import { z } from 'zod'

export const detalhesSchema = z.object({
  nome: z.coerce.string().nonempty('Nome não pode ficar vazio'),
  raca: z.coerce.string().nonempty('Raça não pode ficar vazia'),
  classe: z.coerce.string().nonempty('Classe não pode ficar vazia'),
  origem: z.coerce.string().nonempty('Origem não pode ficar vazia'),
  divindade: z.coerce.string().nonempty('Divindade não pode ficar vazia'),
  nivel: z.coerce
    .number()
    .positive('Nivel não pode ser abaixo de 1')
    .max(20, 'O nivel máximo é 20'),
  experiencia: z.coerce.number().positive('Experiência não pode ser negativa')
})
