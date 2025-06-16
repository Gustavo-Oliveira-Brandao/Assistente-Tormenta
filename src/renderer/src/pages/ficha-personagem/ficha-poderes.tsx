import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { JSX, useMemo, useState } from 'react'
import styles from './ficha-personagem.module.scss'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import {
  useExibirPoderesDefault,
  useExibirPoderesPersonagem
} from '@renderer/hooks/selectors/usePoderQuery'
import { useExibirClassesDefault } from '@renderer/hooks/selectors/useClasseQuery'
import { useExibirRacasDefault } from '@renderer/hooks/selectors/useRacaQuery'
import { CardPoder } from '@renderer/components/card-poder/card-poder'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { Modal } from '@renderer/templates/modal/modal'
import { opcoesCategoriasPoderesGerais } from '@renderer/utils/select options/opcoesCategoriasPoderes'
import { createPortal } from 'react-dom'
import { DeepPartial } from 'typeorm'
import { IPoderPersonagem } from '@renderer/@types/T20 GOTY/IPoder'
import { abrirModal } from '@renderer/store/slices/modalSlice'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { useCriarPoder, useDeletarPoder } from '@renderer/hooks/mutations/usePoderMutation'

type FichaPoderesProps = {
  personagem: IPersonagem
}

export const FichaPoderes = ({ personagem }: FichaPoderesProps): JSX.Element => {
  const { data: poderesDefault } = useExibirPoderesDefault()
  const { data: poderesPersonagem } = useExibirPoderesPersonagem(personagem.id)
  const { data: classesDefault } = useExibirClassesDefault()
  const { data: racasDefault } = useExibirRacasDefault()

  const [categoriaPoderes, setCategoriaPoderes] = useState('CLASSE')
  const [filtroClassePesquisa, setFiltroClassePesquisa] = useState(personagem.classeInicial)
  const [filtroRacaPesquisa, setFiltroRacaPesquisa] = useState(personagem.raca)

  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  const poderesPorClassesPersonagem = useMemo(() => {
    if (!classesDefault) {
      return []
    }

    return personagem.classes.flatMap((classe) => {
      const poderes: DeepPartial<IPoderPersonagem>[] = []

      for (const classeDefault of classesDefault) {
        if (classeDefault.nome == classe.nome) {
          for (const poderClasse of classeDefault.poderes) {
            if (poderClasse.nivel && poderClasse.nivel <= classe.nivel) {
              poderes.push(poderClasse)
            }
          }
        }
      }

      return poderes
    })
  }, [personagem, classesDefault])

  const poderesPorRacaPersonagem = useMemo(() => {
    if (!racasDefault) {
      return []
    }

    return racasDefault.flatMap((raca) => {
      const poderes: DeepPartial<IPoderPersonagem>[] = []
      if (raca.nome == personagem.raca) {
        poderes.push(...raca.poderes)
      }

      return poderes
    })
  }, [racasDefault, personagem])

  const poderesRacaDBFiltro = useMemo(() => {
    if (!racasDefault) {
      return []
    }

    return racasDefault.flatMap((raca) => {
      const poderes: DeepPartial<IPoderPersonagem>[] = []
      if (raca.nome == filtroRacaPesquisa) {
        poderes.push(...raca.poderes)
      }
      return poderes
    })
  }, [racasDefault, filtroRacaPesquisa])

  const poderesClasseDBFiltro = useMemo(() => {
    if (!classesDefault) {
      return []
    }

    return classesDefault.flatMap((classe) => {
      const poderes: DeepPartial<IPoderPersonagem>[] = []
      if (filtroClassePesquisa == classe.nome) {
        poderes.push(...classe.poderesClasse)
      }
      return poderes
    })
  }, [classesDefault, filtroClassePesquisa])

  const poderesFiltrados = useMemo(() => {
    if (!poderesDefault) {
      return []
    }

    if (categoriaPoderes == 'CLASSE') {
      return poderesClasseDBFiltro
    }

    if (categoriaPoderes == 'RACA') {
      return poderesRacaDBFiltro
    }

    return poderesDefault.filter(
      (poder) => poder.categoria && poder.categoria.toLowerCase() == categoriaPoderes.toLowerCase()
    )
  }, [categoriaPoderes, poderesDefault, poderesClasseDBFiltro, poderesRacaDBFiltro])

  const adicionarPoder = useCriarPoder()
  const removerPoder = useDeletarPoder()

  return (
    <section className={styles.secaoPoderes}>
      <div className={styles.poderes}>
        <SecaoFicha
          header={<h2 className="tormenta20Font">Poderes de classe por progressão</h2>}
          css="poderes"
        >
          {poderesPorClassesPersonagem.map((poder) => (
            <CardPoder key={poder.key} poder={poder} nivel={poder.nivel} />
          ))}
        </SecaoFicha>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes de raça</h2>
              <BotaoModular
                css="minimalista"
                texto="Buscar"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('RACA')
                  dispatch(abrirModal(`PODERES_LOJA`))
                }}
                icone="./icons/busca.svg"
              />
            </>
          }
          css="poderes"
        >
          {poderesPersonagem &&
            poderesPersonagem
              .filter((poder) => poder.categoria == 'raca')
              .map((poder) => <CardPoder key={poder.id} poder={poder} />)}
        </SecaoFicha>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes de origem</h2>
              <BotaoModular
                css="minimalista"
                texto="Buscar"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('ORIGEM')
                  dispatch(abrirModal(`PODERES_LOJA`))
                }}
                icone="./icons/busca.svg"
              />
            </>
          }
          css="poderes"
        >
          {poderesPersonagem &&
            poderesPersonagem
              .filter((poder) => poder.categoria == 'origem')
              .map((poder) => <CardPoder key={poder.id} poder={poder} nivel={poder.nivel} />)}
        </SecaoFicha>
      </div>
      <div className={styles.poderes}>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes de classe</h2>
              <BotaoModular
                css="minimalista"
                texto="Buscar"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('CLASSE')
                  dispatch(abrirModal(`PODERES_LOJA`))
                }}
                icone="./icons/busca.svg"
              />
            </>
          }
          css="poderes"
        >
          {poderesPersonagem &&
            poderesPersonagem
              .filter((poder) => poder.categoria == 'classe')
              .map((poder) => <CardPoder key={poder.id} poder={poder} nivel={poder.nivel} />)}
        </SecaoFicha>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes gerais</h2>
              <BotaoModular
                css="minimalista"
                texto="Buscar"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('COMBATE')
                  dispatch(abrirModal(`PODERES_LOJA`))
                }}
                icone="./icons/busca.svg"
              />
            </>
          }
          css="poderes"
        >
          {poderesPersonagem &&
            poderesPersonagem
              .filter(
                (poder) =>
                  poder.categoria != 'classe' &&
                  poder.categoria != 'origem' &&
                  poder.categoria != 'raca'
              )
              .map((poder) => (
                <CardPoder key={poder.id} poder={poder} nivel={poder.nivel} exibeCategoria={true} />
              ))}
        </SecaoFicha>
      </div>
      {modalAberto == 'PODERES_LOJA' &&
        createPortal(
          <Modal
            height="90vh"
            width="550px"
            titulo="Compêndio de poderes"
            overflow="auto"
            sidebar={
              <div className={styles.filtros}>
                <p className="tormenta20Font">Filtros</p>
                <div className={styles.filtro}>
                  <label htmlFor="categoriaPoder" className="tormenta20Font label">
                    Categoria
                  </label>
                  <select
                    id="categoriaPoder"
                    value={categoriaPoderes}
                    className="tormenta20Font select"
                    onChange={(e) => setCategoriaPoderes(e.target.value)}
                  >
                    <option value={'CLASSE'}>Classe</option>
                    <option value={'RACA'}>Raça</option>
                    {opcoesCategoriasPoderesGerais.map((opcao) => (
                      <option key={opcao} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </select>
                </div>
                {categoriaPoderes == 'CLASSE' && (
                  <div className={styles.filtro}>
                    <label htmlFor="filtroClasse" className="tormenta20Font label">
                      Classe
                    </label>
                    <select
                      id="filtroClasse"
                      value={filtroClassePesquisa}
                      className="tormenta20Font select"
                      onChange={(e) => setFiltroClassePesquisa(e.target.value)}
                    >
                      {classesDefault &&
                        classesDefault.map((classe) => (
                          <option key={classe.nome} value={classe.nome}>
                            {classe.nome}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                {categoriaPoderes == 'RACA' && (
                  <div className={styles.filtro}>
                    <label htmlFor="filtroRaca" className="tormenta20Font label">
                      Raça
                    </label>
                    <select
                      id="filtroRaca"
                      value={filtroRacaPesquisa}
                      className="tormenta20Font select"
                      onChange={(e) => setFiltroRacaPesquisa(e.target.value)}
                    >
                      {racasDefault &&
                        racasDefault.map((raca) => (
                          <option key={raca.nome} value={raca.nome}>
                            {raca.nome}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            }
          >
            <h3 className="tormenta20Font">Poderes</h3>
            {poderesFiltrados.map((poder) => (
              <CardPoder
                key={poder.key}
                poder={poder}
                iconeBotaoInteracao="./icons/adicao.svg"
                onInteract={() =>
                  adicionarPoder.mutate({
                    poder: {
                      key: poder.key ?? 1,
                      categoria: poder.categoria ?? 'destino',
                      nivel: personagem.nivelAtual ?? 1
                    },
                    idPersonagem: personagem.id
                  })
                }
              />
            ))}
          </Modal>,
          document.body
        )}
    </section>
  )
}
