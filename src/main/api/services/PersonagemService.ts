import { IPersonagemT20 } from '../@types/t20/Personagem'
import { SQLiteDataSource } from '../data-source'
import { Personagem } from '../entity/personagem'

export const getPersonagem = async (id: number): Promise<IPersonagemT20> => {
  const personagemRepository = SQLiteDataSource.getRepository(Personagem)
  return await personagemRepository
    .findOneBy({
      id: id
    })
    .catch((error) => {
      return error
    })
}

export const postPersonagem = async (
  _personagem: Partial<IPersonagemT20>
): Promise<IPersonagemT20> => {
  const personagemRepository = SQLiteDataSource.getRepository(Personagem)
  return await personagemRepository.save(_personagem).catch((error) => {
    return error
  })
}
