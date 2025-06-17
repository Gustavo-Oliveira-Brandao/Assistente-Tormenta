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
import { abrirModal } from '@renderer/store/slices/modalSlice'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { useCriarPoder, useDeletarPoder } from '@renderer/hooks/mutations/usePoderMutation'
import { DeepPartial } from 'typeorm'
import { IPoderPersonagem } from '@renderer/@types/T20 GOTY/IPoder'

type FichaPoderesProps = {
  personagem: IPersonagem
}

export const FichaPoderes = ({ personagem }: FichaPoderesProps): JSX.Element => {
  const { data: compendioPoderes } = useExibirPoderesDefault()
  const { data: compendioClasses } = useExibirClassesDefault()
  const { data: compendioRacas } = useExibirRacasDefault()
  const { data: poderesPersonagem } = useExibirPoderesPersonagem(personagem.id)

  const [categoriaPoderes, setCategoriaPoderes] = useState('CLASSE')
  const [filtroClassePesquisa, setFiltroClassePesquisa] = useState(personagem.classeInicial)
  const [filtroRacaPesquisa, setFiltroRacaPesquisa] = useState(personagem.raca)

  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  const poderesProgressaoEmClasses = useMemo(() => {
    if (!compendioPoderes) {
      return []
    }

    return personagem.classes.flatMap((classe) => {
      const poderes: DeepPartial<IPoderPersonagem>[] = []
      for (const poder of compendioPoderes) {
        if (poder.fonte == classe.nome && poder.nivel && poder.nivel <= classe.nivel) {
          poderes.push(poder)
        }
      }
      return poderes
    })
  }, [compendioPoderes, personagem])

  const poderesFiltrados = useMemo(() => {
    if (!compendioPoderes) {
      return []
    }

    if (categoriaPoderes == 'RACA') {
      return compendioPoderes.filter((poder) => poder.fonte && poder.fonte == filtroRacaPesquisa)
    }

    if (categoriaPoderes == 'CLASSE') {
      return compendioPoderes.filter((poder) => poder.categoria && poder.categoria == 'classe' && poder.fonte && poder.fonte == filtroClassePesquisa)
    }

    return compendioPoderes.filter(
      (poder) => poder.categoria && poder.categoria.toLowerCase() == categoriaPoderes.toLowerCase()
    )
  }, [categoriaPoderes, compendioPoderes, filtroClassePesquisa, filtroRacaPesquisa])

  const adicionarPoder = useCriarPoder()
  const removerPoder = useDeletarPoder()

  return (
    <section className={styles.secaoPoderes}>
      <div className={styles.poderes}>
        <SecaoFicha
          header={<h2 className="tormenta20Font">Poderes de classe por progressão</h2>}
          css="poderes"
        >
          {poderesProgressaoEmClasses &&
            poderesProgressaoEmClasses.map((poder) => (
              <CardPoder key={poder.id} poder={poder} nivel={poder.nivel} exibeFonte={true} />
            ))}
        </SecaoFicha>
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
              .map((poder) => (
                <CardPoder
                  key={poder.id}
                  poder={poder}
                  nivel={poder.nivel}
                  exibeFonte={true}
                  onInteract={() => removerPoder.mutate(poder.id)}
                  iconeBotaoInteracao={'./icons/delete.svg'}
                />
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
              .map((poder) => (
                <CardPoder
                  key={poder.id}
                  poder={poder}
                  exibeFonte={true}
                  onInteract={() => removerPoder.mutate(poder.id)}
                  iconeBotaoInteracao={'./icons/delete.svg'}
                />
              ))}
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
              .map((poder) => (
                <CardPoder
                  key={poder.id}
                  poder={poder}
                  nivel={poder.nivel}
                  exibeFonte={true}
                  onInteract={() => removerPoder.mutate(poder.id)}
                  iconeBotaoInteracao={'./icons/delete.svg'}
                />
              ))}
        </SecaoFicha>
      </div>
      <div className={styles.poderes}>
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
              .filter((poder) => poder.fonte == 'geral' && poder.categoria != 'origem')
              .map((poder) => (
                <CardPoder
                  key={poder.id}
                  poder={poder}
                  nivel={poder.nivel}
                  exibeCategoria={true}
                  onInteract={() => removerPoder.mutate(poder.id)}
                  iconeBotaoInteracao={'./icons/delete.svg'}
                />
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
                      {compendioClasses &&
                        compendioClasses.map((classe) => (
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
                      {compendioRacas &&
                        compendioRacas.map((raca) => (
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
                      key: poder.key ?? '',
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
