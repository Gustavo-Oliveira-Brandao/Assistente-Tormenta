import { IMagia } from '../@types/t20/Magia'
import { criaturaRepository } from '../repositories/CriaturaRepository'
import { magiaRepository } from '../repositories/MagiaRepository'

export const getMagiasPorPersonagem = async (_idPersonagem: number): Promise<IMagia[]> => {
  try {
    const magias = await magiaRepository.find({ where: { personagem: { id: _idPersonagem } } })
    return magias
  } catch (err) {
    throw new Error('Erro ao buscar magias')
  }
}

export const postMagia = async (_magia: IMagia, idPersonagem: number): Promise<IMagia> => {
  try {
    const magia = magiaRepository.create(_magia)
    magia.personagem = await criaturaRepository.findOneBy({ id: idPersonagem }).catch((err) => {
      return err
    })

    return await magiaRepository.save(magia)
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao adicionar magia ao personagem.')
  }
}

export const deleteMagia = async (_id: number): Promise<void> => {
  try {
    await magiaRepository.delete(_id)
  } catch (err) {
    throw new Error('Erro ao deletar magia.')
  }
}
