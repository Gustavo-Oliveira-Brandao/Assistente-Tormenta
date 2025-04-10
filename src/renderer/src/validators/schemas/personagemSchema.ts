import { z } from 'zod'

export const personagemSchema = z
  .object({
    nome: z.string().nonempty('Nome não pode ser vazio'),
    tipoCriatura: z.string().nonempty('Tipo de criatura não pode ser vazio'),
    raca: z.string().nonempty('Raça não pode ser vazio'),
    classe: z.string().nonempty('Classe não pode ser vazio'),
    origem: z.string().nonempty('Origem não pode ser vazio'),
    divindade: z.string().nonempty('Divindade não pode ser vazio'),
    tamanho: z.string().nonempty('Tamanho não pode ser vazio'),
    alinhamento: z.string().nonempty('Alinhamento não pode ser vazio'),
    nivel: z.coerce
      .number()
      .positive('Nivel não pode ser abaixo de 1')
      .max(20, 'O nivel máximo é 20'),
    experiencia: z.coerce.number().nonnegative('Experiência não pode ser um valor negativo')
  })
  .required()
