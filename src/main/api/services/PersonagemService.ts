import { ICriatura } from '../@types/t20/Criatura'
import { criaturaRepository } from '../repositories/CriaturaRepository'

export const getTodosPersonagens = async (): Promise<ICriatura[]> => {
  return await criaturaRepository.find().catch((error) => {
    console.error('Erro: ' + error)
    return error
  })
}

export const getPersonagem = async (id: number): Promise<ICriatura> => {
  return await criaturaRepository
    .findOneBy({
      id: id
    })
    .catch((error) => {
      return error
    })
}

export const postPersonagem = async (_personagem: Partial<ICriatura>): Promise<ICriatura> => {
  const personagem = criaturaRepository.create(_personagem)
  return await criaturaRepository.save(personagem).catch((error) => {
    console.log(error)
    return error
  })
}

export const putPersonagem = async (_personagem: ICriatura): Promise<ICriatura> => {
  return await criaturaRepository
    .findOneBy({
      id: _personagem.id
    })
    .then(async (personagem) => {
      if (personagem && personagem.categoria === 'pj') {
        personagem.nome = _personagem.nome
        personagem.raca = _personagem.raca
        personagem.classe = _personagem.classe ?? 'guerreiro'
        personagem.origem = _personagem.origem ?? 'taverneiro'
        personagem.divindade = _personagem.divindade ?? 'nenhum'
        personagem.nivel = _personagem.nivel
        personagem.experiencia = _personagem.experiencia ?? 0
        personagem.alinhamento = _personagem.alinhamento ?? 'n'
        personagem.tamanho = _personagem.tamanho
        personagem.tipoCriatura = _personagem.tipoCriatura
        return await criaturaRepository.save(personagem)
      }
      return 'Personagem não encontrado'
    })
    .catch((err) => {
      return err
    })
}

export const deletePersonagem = async (id: number): Promise<void> => {
  await criaturaRepository.delete(id)
}
