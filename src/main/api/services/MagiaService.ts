import { prisma } from '../..'
import { IGrimorio, IMagia, IMagiaPostRequestDTO } from '../../@types/T20 GOTY/IMagia'

export const putGrimorio = async (id: number, _grimorio: IGrimorio): Promise<void> => {
  try {
    await prisma.grimorio.update({
      where: { id: id },
      data: {
        atributoChaveMagias: _grimorio.atributoChaveMagias,
        bonusCD: _grimorio.bonusCD
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao atualizar grimório')
  }
}

export const getGrimorioPersonagem = async (_idPersonagem: number): Promise<IGrimorio> => {
  try {
    const grimorio = await prisma.grimorio.findUnique({
      where: {
        personagemId: _idPersonagem
      },
      include: {
        magias: {
          include: {
            aprimoramentos: true
          }
        }
      }
    })

    if (grimorio == null) {
      throw new Error('Grimório não encontrado!')
    }

    return grimorio
  } catch {
    throw new Error('Erro ao recuperar grimório.')
  }
}

export const postMagia = async (
  magia: IMagiaPostRequestDTO,
  _idGrimorio: number
): Promise<void> => {
  try {
    await prisma.magia.create({
      data: {
        key: magia.key,
        nome: magia.nome,
        alvo: magia.alvo,
        area: magia.area,
        efeito: magia.efeito,
        execucao: magia.execucao,
        resistencia: magia.resistencia,
        descricao: magia.descricao,
        duracao: magia.duracao,
        nivelCirculo: magia.nivelCirculo,
        alcance: magia.alcance,
        tradicao: magia.tradicao,
        publicacao: magia.publicacao,
        escola: magia.escola,
        aprimoramentos: {
          create: magia.aprimoramentos
        },
        grimorio: {
          connect: {
            id: _idGrimorio
          }
        }
      }
    })
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao adicionar magia.')
  }
}

export const putMagia = async (id: number, _magia: IMagia): Promise<void> => {
  try {
    const idsAprimoramentosAManter = _magia.aprimoramentos
      .map((aprimoramento) => aprimoramento.id)
      .filter((id) => id != undefined)

    await prisma.magia.update({
      where: {
        id: id
      },
      data: {
        nome: _magia.nome,
        alvo: _magia.alvo,
        area: _magia.area,
        efeito: _magia.efeito,
        execucao: _magia.execucao,
        resistencia: _magia.resistencia,
        descricao: _magia.descricao,
        duracao: _magia.duracao,
        nivelCirculo: _magia.nivelCirculo,
        alcance: _magia.alcance,
        tradicao: _magia.tradicao,
        publicacao: _magia.publicacao,
        escola: _magia.escola,
        aprimoramentos: {
          deleteMany: {
            id: {
              notIn: idsAprimoramentosAManter
            }
          },
          upsert: _magia.aprimoramentos.map((aprimoramento) => ({
            where: {
              id: aprimoramento.id
            },
            update: {
              custo: aprimoramento.custo,
              descricao: aprimoramento.descricao
            },
            create: { ...aprimoramento }
          }))
        }
      }
    })
  } catch {
    throw new Error('Erro ao atualizar magia!')
  }
}

export const deleteMagia = async (_id: number): Promise<void> => {
  try {
    await prisma.magia.delete({
      where: {
        id: _id
      }
    })
  } catch {
    throw new Error('Erro ao deletar magia.')
  }
}
