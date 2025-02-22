import { IPersonagem } from '../@types/t20/Personagem'
import { IPoder } from '../@types/t20/Poder'
import { SQLiteDataSource } from '../data-source'
import { Personagem } from '../entity/personagem'
import { Poder } from '../entity/poder'

export const getTodosPersonagens = async (): Promise<IPersonagem[]> => {
  const personagemRepository = SQLiteDataSource.getRepository(Personagem)
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
  await personagemRepository.delete(id)
}

export const postPoder = async (_poder: IPoder, idPersonagem: number): Promise<IPoder> => {
  const poderRepository = SQLiteDataSource.getRepository(Poder)
  const personagemRepository = SQLiteDataSource.getRepository(Personagem)
  const poder = poderRepository.create(_poder)
  poder.personagem = await personagemRepository
    .findOneBy({
      id: idPersonagem
    })
    .catch((err) => {
      return err
    })

  return await poderRepository.save(poder).catch((error) => {
    return error
  })
}

export const deletePoder = async (_id: number): Promise<void> => {
  const poderRepository = SQLiteDataSource.getRepository(Poder)
  await poderRepository.delete(_id)
}
