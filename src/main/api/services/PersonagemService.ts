import { IAtributo } from '../@types/t20/Atributo'
import { ICriatura } from '../@types/t20/Criatura'
import { IDefesa } from '../@types/t20/Defesa'
import { IDeslocamento } from '../@types/t20/Deslocamento'
import { IPericia } from '../@types/t20/Pericia'
import { IPoder } from '../@types/t20/Poder'
import { IRecurso } from '../@types/t20/Recurso'
import { SQLiteDataSource } from '../data-source'
import { Atributo } from '../entity/atributo'
import { Criatura } from '../entity/criatura'
import { Defesa } from '../entity/defesa'
import { Deslocamento } from '../entity/deslocamento'
import { Mana } from '../entity/mana'
import { Pericia } from '../entity/pericia'
import { Poder } from '../entity/poder'
import { Vida } from '../entity/vida'

export const getTodosPersonagens = async (): Promise<ICriatura[]> => {
  const personagemRepository = SQLiteDataSource.getRepository(Criatura)
  return await personagemRepository.find().catch((error) => {
    console.error('Erro: ' + error)
    return error
  })
}

export const getPersonagem = async (id: number): Promise<ICriatura> => {
  const personagemRepository = SQLiteDataSource.getRepository(Criatura)
  return await personagemRepository
    .findOneBy({
      id: id
    })
    .catch((error) => {
      return error
    })
}

export const postPersonagem = async (_personagem: Partial<ICriatura>): Promise<ICriatura> => {
  const personagemRepository = SQLiteDataSource.getRepository(Criatura)
  const personagem = personagemRepository.create(_personagem)
  return await personagemRepository.save(personagem).catch((error) => {
    console.log(error)
    return error
  })
}

export const putPersonagem = async (_personagem: ICriatura): Promise<ICriatura> => {
  const personagemRepository = SQLiteDataSource.getRepository(Criatura)
  return await personagemRepository
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
        personagem.alinhamento = _personagem.alinhamento
        personagem.tamanho = _personagem.tamanho
        personagem.tipoCriatura = _personagem.tipoCriatura
        return await personagemRepository.save(personagem)
      }
      return 'Personagem não encontrado'
    })
    .catch((err) => {
      return err
    })
}

export const deletePersonagem = async (id: number): Promise<void> => {
  const personagemRepository = SQLiteDataSource.getRepository(Criatura)
  await personagemRepository.delete(id)
}

export const postPoder = async (_poder: IPoder, idPersonagem: number): Promise<IPoder> => {
  const poderRepository = SQLiteDataSource.getRepository(Poder)
  const personagemRepository = SQLiteDataSource.getRepository(Criatura)
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

export const putAtributo = async (_atributo: IAtributo): Promise<IAtributo> => {
  const atributoRepository = SQLiteDataSource.getRepository(Atributo)
  const atributo = atributoRepository.create(_atributo)
  return await atributoRepository
    .update(atributo.id, atributo)
    .then((atributo) => {
      return atributo
    })
    .catch((err) => {
      return err
    })
}

export const putVida = async (_vida: IRecurso): Promise<IRecurso> => {
  const vidaRepository = SQLiteDataSource.getRepository(Vida)
  const vida = vidaRepository.create(_vida)
  return await vidaRepository
    .update(vida.id, vida)
    .then((vida) => {
      return vida
    })
    .catch((err) => {
      return err
    })
}

export const putMana = async (_mana: IRecurso): Promise<IRecurso> => {
  const manaRepository = SQLiteDataSource.getRepository(Mana)
  const mana = manaRepository.create(_mana)
  return await manaRepository
    .update(mana.id, mana)
    .then((mana) => {
      return mana
    })
    .catch((err) => {
      return err
    })
}

export const putDefesa = async (_defesa: IDefesa): Promise<IDefesa> => {
  const defesaRepository = SQLiteDataSource.getRepository(Defesa)
  const defesa = defesaRepository.create(_defesa)
  return await defesaRepository
    .update(defesa.id, defesa)
    .then((defesa) => {
      return defesa
    })
    .catch((err) => {
      return err
    })
}

export const putDeslocamento = async (_deslocamento: IDeslocamento): Promise<IDeslocamento> => {
  const deslocamentoRepository = SQLiteDataSource.getRepository(Deslocamento)
  const deslocamento = deslocamentoRepository.create(_deslocamento)
  return await deslocamentoRepository
    .update(deslocamento.id, deslocamento)
    .then((deslocamento) => {
      return deslocamento
    })
    .catch((err) => {
      return err
    })
}

export const putPericia = async (_pericia: IPericia): Promise<IPericia> => {
  const periciaRepository = SQLiteDataSource.getRepository(Pericia)
  const pericia = periciaRepository.create(_pericia)
  return await periciaRepository
    .update(pericia.id, pericia)
    .then((pericia) => {
      return pericia
    })
    .catch((err) => {
      return err
    })
}
