import { DeepPartial } from 'typeorm'
import { SQLiteDataSource } from '../data-source'
import { Classe } from '../entities/Classe'
import { Personagem } from '../entities/Personagem'

export const ClasseRepository = SQLiteDataSource.getRepository(Classe)

export const postClasse = async (
  _classe: DeepPartial<Classe>,
  _idPersonagem: number
): Promise<void> => {
  try {
    const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
    const personagem = await PersonagemRepository.findOneBy({
      id: _idPersonagem
    })

    if (!personagem) {
      throw new Error('Personagem não encontrado!')
    }

    const novaClasse = ClasseRepository.create({
      ..._classe,
      personagem: personagem
    })

    await ClasseRepository.save(novaClasse)
  } catch {
    throw new Error('Erro ao adicionar classe!')
  }
}

export const putClasse = async (_classe: Classe): Promise<void> => {
  try {
    const classeEncontrada = await ClasseRepository.findOneBy({ id: _classe.id })
    if (!classeEncontrada) {
      throw new Error('Classe não encontrada!')
    }

    ClasseRepository.merge(classeEncontrada, _classe)

    await ClasseRepository.save(classeEncontrada)
  } catch {
    throw new Error('Erro ao atualizar classe.')
  }
}

export const deleteClasse = async (_id: number): Promise<void> => {
  await ClasseRepository.delete(_id)
}
