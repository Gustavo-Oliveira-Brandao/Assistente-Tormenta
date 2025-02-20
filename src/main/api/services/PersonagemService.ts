import { IPersonagem } from '../@types/t20/Personagem'
import { SQLiteDataSource } from '../data-source'
import { Personagem } from '../entity/personagem'

export const getTodosPersonagens = async (): Promise<IPersonagem[]> => {
  const personagemRepository = SQLiteDataSource.getRepository(Personagem)
  const personagem = await personagemRepository.find()
  console.log(personagem)
  return await personagemRepository.find().catch((error) => {
    console.error('Erro: ' + error)
    return error
  })
}
export const getPersonagem = async (id: number): Promise<IPersonagem> => {
  const personagemRepository = SQLiteDataSource.getRepository(Personagem)
  return await personagemRepository
    .findOneBy({
      id: id
    })
    .catch((error) => {
      return error
    })
}

export const postPersonagem = async (_personagem: Partial<IPersonagem>): Promise<IPersonagem> => {
  const personagemRepository = SQLiteDataSource.getRepository(Personagem)
  return await personagemRepository.save(_personagem).catch((error) => {
    return error
  })
}

export const putPersonagem = async (_personagem: IPersonagem): Promise<IPersonagem> => {
  const personagemRepository = SQLiteDataSource.getRepository(Personagem)
  return await personagemRepository
    .update(_personagem.id, _personagem)
    .then((personagem) => {
      return personagem
    })
    .catch((error) => {
      return error
    })
}

export const deletePersonagem = async (id: number): Promise<void> => {
  const personagemRepository = SQLiteDataSource.getRepository(Personagem)
  personagemRepository.delete(id)
}
