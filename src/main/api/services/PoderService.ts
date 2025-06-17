import path from 'path'
import { SQLiteDataSource } from '../data-source'
import { extrairJson } from './JsonService'
import { IPoderDTO } from '../../@types/IPoderDTO'
import { Personagem } from '../entities/Personagem'
import { Poder } from '../entities/Poder'
import { DeepPartial } from 'typeorm'
import { getClassesDefault } from './ClasseService'
import { getRacasDefault } from './RacaService'

export const PoderRepository = SQLiteDataSource.getRepository(Poder)

export const getPoderesDefault = async (): Promise<DeepPartial<Poder>[]> => {
  const pasta = path.join('packs', 'T20 GOTY', 'poderes')
  const result = (await extrairJson(pasta)) as DeepPartial<Poder>[]
  const poderes = result
  return poderes
}

export const getPoderesPersonagem = async (_idPersonagem: number): Promise<Poder[]> => {
  try {
    const poderes = await PoderRepository.find({ where: { personagem: { id: _idPersonagem } } })
    return poderes
  } catch {
    throw new Error('Erro ao recuperar poderes')
  }
}

export const postPoder = async (_poderDTO: IPoderDTO, _idPersonagem: number): Promise<void> => {
  try {
    const PersonagemRepository = SQLiteDataSource.getRepository(Personagem)
    const personagem = await PersonagemRepository.findOneBy({ id: _idPersonagem })
    if (!personagem) {
      throw new Error('Personagem não encontrado')
    }

    const poderes = await getPoderesDefault()

    const { categoria } = _poderDTO
    if (categoria == 'raca') {
      const racas = await getRacasDefault()
      for (const raca of racas) {
        for (const poder of raca.poderes) {
          if (poder.key == _poderDTO.key) {
            const novoPoder = PoderRepository.create({
              ...poder,
              nivel: _poderDTO.nivel,
              tags: poder.tags,
              subEfeitos: poder.subEfeitos,
              personagem: personagem
            })
            await PoderRepository.save(novoPoder)
          }
        }
      }
    }
    if (categoria == 'classe') {
      const classes = await getClassesDefault()
      for (const classe of classes) {
        for (const poder of classe.poderesClasse) {
          if (poder.key == _poderDTO.key) {
            const novoPoder = PoderRepository.create({
              ...poder,
              nivel: _poderDTO.nivel,
              tags: poder.tags,
              subEfeitos: poder.subEfeitos,
              personagem: personagem
            })
            await PoderRepository.save(novoPoder)
          }
        }
      }
    }
    if (
      categoria == 'combate' ||
      categoria == 'destino' ||
      categoria == 'concedido' ||
      categoria == 'tormenta' ||
      categoria == 'origem' ||
      categoria == 'magia'
    ) {
      for (const poder of poderes) {
        if (poder.key == _poderDTO.key) {
          const novoPoder = PoderRepository.create({
            ...poder,
            nivel: _poderDTO.nivel,
            tags: poder.tags,
            subEfeitos: poder.subEfeitos,
            personagem: personagem
          })
          await PoderRepository.save(novoPoder)
        }
      }
    }
  } catch {
    throw new Error('Erro ao adicionar poder!')
  }
}

export const deletePoder = async (_id: number): Promise<void> => {
  try {
    await PoderRepository.delete(_id)
  } catch {
    throw new Error('Erro ao deletar poder.')
  }
}
