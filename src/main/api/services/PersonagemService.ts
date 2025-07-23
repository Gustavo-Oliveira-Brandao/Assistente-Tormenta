import { prisma } from '../..'
import { IPersonagemResponseManyDTO } from '../../@types/T20 GOTY/dto/IPersonagemDTO'
import { IPersonagemJogador } from '../../@types/T20 GOTY/IPersonagem'

export const getTodosPersonagem = async (): Promise<IPersonagemResponseManyDTO[]> => {
  try {
    const personagens = await prisma.personagem.findMany({
      include: {
        detalhesPJ: true
      }
    })
    return personagens
  } catch {
    throw new Error('Erro ao exibir personagens!')
  }
}

export const getPersonagem = async (id: number): Promise<IPersonagemJogador> => {
  try {
    const personagem = await prisma.personagem.findUnique({
      where: { id: id },
      include: {
        detalhesPJ: true,
        classes: true,
        atributos: true,
        pericias: true,
        deslocamentos: true,
        status: true,
        efeitos: {
          include: {
            modificadores: true
          }
        }
      }
    })
    

    if (personagem && personagem.detalhesPJ) {
      return personagem
    }

    throw new Error('Personagem não encontrado')
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao exibir personagem.')
  }
}

export const postPersonagem = async (_personagem: DeepPartial<Personagem>): Promise<void> => {
  try {
    const personagem = PersonagemRepository.create(_personagem)
    await PersonagemRepository.save(personagem)
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao criar personagem.')
  }
}

export const putPersonagem = async (_personagem: Personagem): Promise<void> => {
  try {
    const personagemEncontrado = await PersonagemRepository.findOneBy({ id: _personagem.id })
    if (personagemEncontrado) {
      PersonagemRepository.merge(personagemEncontrado, _personagem)
      await PersonagemRepository.save(personagemEncontrado)
    }
    throw new Error('Personagem não encontrado!')
  } catch {
    throw new Error('Erro ao atualizar personagem.')
  }
}

export const deletePersonagem = async (id: number): Promise<void> => {
  try {
    await PersonagemRepository.delete(id)
  } catch {
    throw new Error('Erro ao deletar personagem.')
  }
}
