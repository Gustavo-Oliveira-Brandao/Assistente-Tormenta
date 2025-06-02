import { JSX, useMemo, useState } from 'react'
import styles from './sidebar-ficha.module.scss'
import { BarraProgressao } from '@renderer/components/barra-recurso/barra-progressao'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { CardPoder } from '@renderer/components/card-poder/card-poder'
import { Pericia } from '@renderer/components/pericia/pericia'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { createPortal } from 'react-dom'
import { Modal } from '../modal/modal'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { useNavigate } from 'react-router-dom'
import { useExibirProgressaoPersonagem } from '@renderer/hooks/selectors/usePersonagemQuery'
import { RootState } from '@renderer/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { useCriarPoder } from '@renderer/hooks/mutations/usePoderMutation'
import { useExibirPoderesDefault } from '@renderer/hooks/selectors/usePoderQuery'
import { useExibirClassesDefault } from '@renderer/hooks/selectors/useClasseQuery'
import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { DeepPartial } from 'typeorm'

type SidebarFichaProps = {
  personagem: IPersonagem
}

export const SidebarFicha = ({ personagem }: SidebarFichaProps): JSX.Element => {
  const [abaSidebar, setAbaSidebar] = useState('STATUS')
  const [abaPoderesPesquisa, setAbaPoderesPesquisa] = useState('CLASSE')
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  const { data: niveis } = useExibirProgressaoPersonagem(personagem.id)
  const { data: classes } = useExibirClassesDefault()
  const { data: poderesDefault } = useExibirPoderesDefault()

  const poderesClassePesquisa = useMemo(() => {
    if (!classes || !personagem) {
      return []
    }

    return classes.flatMap((classe) => {
      const poderes: DeepPartial<IPoder>[] = []
      if (classe.nome == personagem.classe) {
        poderes.push(...classe.poderesClasse)
      }
      return poderes
    })
  }, [classes, personagem])

  const poderesProgressao = useMemo(() => {
    if (!niveis || !classes) {
      return []
    }

    return classes.flatMap((classe) => {
      let contadorNivelClasse = 0

      const poderesAdquiridosClasse: DeepPartial<IPoder>[] = []

      for (const nivel of niveis) {
        if (nivel.classe === classe.nome) {
          if (nivel.valor <= personagem.nivelAtual) {
            contadorNivelClasse++
            for (const progressao of classe.progressao) {
              if (progressao.nivel <= contadorNivelClasse) {
                poderesAdquiridosClasse.push(...progressao.poderes)
              }
            }
          }
        }
      }

      return poderesAdquiridosClasse
    })
  }, [classes, niveis, personagem])

  const poderesPesquisados = useMemo(() => {
    if (!poderesDefault) {
      return []
    }
    let poderesFiltrados: DeepPartial<IPoder>[] = []

    if (abaPoderesPesquisa === 'CLASSE') {
      poderesFiltrados = poderesClassePesquisa
    } else if (abaPoderesPesquisa === 'COMBATE') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'combate')
    } else if (abaPoderesPesquisa === 'DESTINO') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'destino')
    } else if (abaPoderesPesquisa === 'MAGIA') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'magia')
    } else if (abaPoderesPesquisa === 'CONCEDIDOS') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'concedido')
    } else if (abaPoderesPesquisa === 'TORMENTA') {
      poderesFiltrados = poderesDefault.filter((poder) => poder.categoria == 'tormenta')
    }
    return poderesFiltrados
  }, [poderesDefault, abaPoderesPesquisa, poderesClassePesquisa])

  const adicionarPoder = useCriarPoder()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.abasSidebar}>
        <BotaoModular
          css="minimalista"
          onClickEvent={() => navigate('/')}
          font="tormenta20Font"
          cor="corPrimaria"
          icone="./icons/voltar.svg"
        />
        <BotaoModular
          css="botaoExpansivel"
          onClickEvent={() => setAbaSidebar('STATUS')}
          font="tormenta20Font"
          estaAtivo={abaSidebar == 'STATUS' ? true : false}
          cor="corPrimaria"
          texto={abaSidebar === 'STATUS' ? 'Status' : undefined}
          icone="./icons/status.svg"
        />
        <BotaoModular
          css="botaoExpansivel"
          onClickEvent={() => setAbaSidebar('PROGRESSAO')}
          font="tormenta20Font"
          estaAtivo={abaSidebar == 'PROGRESSAO' ? true : false}
          cor="corPrimaria"
          texto={abaSidebar === 'PROGRESSAO' ? 'Progressão' : undefined}
          icone="./icons/upgrade.svg"
        />
      </div>
      {abaSidebar === 'PROGRESSAO' && (
        <div className={styles.progressao}>
          {niveis &&
            niveis
              .sort((a, b) => a.valor + b.valor)
              .map((nivel) => (
                <div key={nivel.id} className={styles.nivel}>
                  <h3 className={`tormenta20Font ${styles.valorNivel}`}>{nivel.valor}º nível</h3>
                  <div className={styles.poderes}>
                    {nivel.poderes.map((poder) => (
                      <button key={poder.id} className={styles.poder}>
                        <img src="./icons/arcanista.svg" alt={poder.nome} />
                        <div className={styles.titulo}>
                          <p className={`tormenta20Font ${styles.categoria}`}>{poder.categoria}</p>
                          <p className={`tormenta20Font ${styles.nome}`}>{poder.nome}</p>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => dispatch(abrirModal(`PODERES_${nivel.id}_LOJA_MODAL`))}
                      className={styles.poder}
                    >
                      <img src="./icons/adicao.svg" alt="Adicionar poder" />
                      <div className={styles.titulo}>
                        <p className={`tormenta20Font ${styles.nome}`}>Adicionar poder</p>
                      </div>
                    </button>
                  </div>
                  {modalAberto === `PODERES_${nivel.id}_LOJA_MODAL` &&
                    createPortal(
                      <Modal
                        titulo="Adicionar poderes"
                        onClose={() => dispatch(fecharModal())}
                        height="400px"
                        width="550px"
                      >
                        <div className={styles.lojaHeader}>
                          <h3 className="tormenta20Font">Filtros</h3>
                          <div className={styles.filtros}>
                            <BotaoModular
                              css="botaoFiltro"
                              estaAtivo={abaPoderesPesquisa === 'CLASSE' ? true : false}
                              cor="corPrimaria"
                              texto="Classe"
                              font="tormenta20Font"
                              onClickEvent={() => setAbaPoderesPesquisa('CLASSE')}
                            />

                            <BotaoModular
                              css="botaoFiltro"
                              estaAtivo={abaPoderesPesquisa === 'COMBATE' ? true : false}
                              cor="corPrimaria"
                              texto="Combate"
                              font="tormenta20Font"
                              onClickEvent={() => setAbaPoderesPesquisa('COMBATE')}
                            />

                            <BotaoModular
                              css="botaoFiltro"
                              estaAtivo={abaPoderesPesquisa === 'DESTINO' ? true : false}
                              cor="corPrimaria"
                              texto="Destino"
                              font="tormenta20Font"
                              onClickEvent={() => setAbaPoderesPesquisa('DESTINO')}
                            />

                            <BotaoModular
                              css="botaoFiltro"
                              estaAtivo={abaPoderesPesquisa === 'CONCEDIDOS' ? true : false}
                              cor="corPrimaria"
                              texto="Concedidos"
                              font="tormenta20Font"
                              onClickEvent={() => setAbaPoderesPesquisa('CONCEDIDOS')}
                            />

                            <BotaoModular
                              css="botaoFiltro"
                              estaAtivo={abaPoderesPesquisa === 'MAGIA' ? true : false}
                              cor="corPrimaria"
                              texto="Magia"
                              font="tormenta20Font"
                              onClickEvent={() => setAbaPoderesPesquisa('MAGIA')}
                            />

                            <BotaoModular
                              css="botaoFiltro"
                              estaAtivo={abaPoderesPesquisa === 'TORMENTA' ? true : false}
                              cor="corPrimaria"
                              texto="Tormenta"
                              font="tormenta20Font"
                              onClickEvent={() => setAbaPoderesPesquisa('TORMENTA')}
                            />
                          </div>
                        </div>
                        <>
                          <h3 className="tormenta20Font">Poderes</h3>
                          {poderesPesquisados &&
                            poderesPesquisados.map((poder) => (
                              <CardPoder
                                key={poder.key}
                                poder={poder}
                                iconeBotaoInteracao="./icons/adicao.svg"
                                onInteract={() => adicionarPoder.mutate({ poder, nivel })}
                              />
                            ))}
                        </>
                      </Modal>,
                      document.body
                    )}
                </div>
              ))}
        </div>
      )}
      {abaSidebar === 'STATUS' && (
        <>
          <div
            onClick={() => dispatch(abrirModal('DETALHES_EDICAO_MODAL'))}
            className={styles.fotoPersonagem}
          >
            <img src="./character.png" alt={personagem.nome} />
            <span className={styles.opacidade}></span>
            <div className={styles.detalhes}>
              <div className={styles.detalhe}>
                <img src={`./icons/${personagem.raca}.svg`} alt={personagem.raca} />
                <p className="tormenta20Font">{personagem.raca}</p>
              </div>
              <div className={styles.detalhe}>
                <img src={`./icons/${personagem.classe}.svg`} alt="Classe" />
                <p className="tormenta20Font">{personagem.classe}</p>
              </div>
              <div className={styles.detalhe}>
                <img src={`./icons/tanna-toh.svg`} alt={personagem.origem} />
                <p className="tormenta20Font">{personagem.origem}</p>
              </div>
              <div className={styles.detalhe}>
                <img
                  src={`./icons/${personagem.divindade.toLowerCase()}.svg`}
                  alt={personagem.divindade}
                />
                <p className="tormenta20Font">{personagem.divindade}</p>
              </div>
            </div>
          </div>
          <div className={styles.personagemInfo}>
            <div className={styles.nome}>
              <p className="tormenta20Font">{personagem.nome}</p>
            </div>
            <div className={styles.nivel}>
              <p className="tormenta20Font">{personagem.nivelAtual}</p>
            </div>
          </div>
          <div className={styles.barrasRecurso}>
            {personagem.recursos
              .filter((recurso) => recurso.categoria == 'vida' || recurso.categoria == 'mana')
              .sort((a, b) => {
                if (a.categoria < b.categoria) {
                  return 1
                }
                if (a.categoria > b.categoria) {
                  return -1
                }
                return 0
              })
              .map((recurso) => (
                <div key={recurso.id} className={styles.barra}>
                  <BarraProgressao
                    valorAtual={recurso.valorAtual}
                    valorMaximo={recurso.valorMaximo ?? 0}
                    categoria={recurso.categoria}
                    height="30px"
                  />
                </div>
              ))}

            {personagem.recursos
              .filter((recurso) => recurso.categoria == 'defesa')
              .map((recurso) => (
                <div key={recurso.id} className={styles.infoSecundaria}>
                  <div className={styles.titulo}>
                    <h2 className="tormenta20Font">{recurso.categoria}</h2>
                  </div>
                  <div className={styles.recurso}>
                    <img src="./icons/paladino.svg" alt="Defesa" />
                    <BotaoModular
                      onClickEvent={() => dispatch(abrirModal(`${recurso.categoria}_EDICAO_MODAL`))}
                      texto={recurso.valorMaximo}
                      font="tormenta20Font"
                      css="botaoQuadrado30px"
                      cor="corSecundaria"
                    />
                  </div>
                  {modalAberto == `${recurso.categoria}_EDICAO_MODAL` &&
                    createPortal(
                      <Modal
                        width="550px"
                        titulo={recurso.categoria}
                        onClose={() => dispatch(fecharModal())}
                        height="400px"
                      >
                        <></>
                      </Modal>,
                      document.body
                    )}
                </div>
              ))}
            {personagem.deslocamentos
              .filter((deslocamento) => deslocamento.nome == 'caminhada')
              .map((deslocamento) => (
                <div key={deslocamento.id} className={styles.infoSecundaria}>
                  <div className={styles.titulo}>
                    <h2 className="tormenta20Font">{deslocamento.nome}</h2>
                  </div>
                  <div className={styles.recurso}>
                    <img src="./icons/deslocamento.svg" alt="Defesa" />
                    <BotaoModular
                      onClickEvent={() =>
                        dispatch(abrirModal(`DESLOCAMENTO_${deslocamento.nome}_EDICAO_MODAL`))
                      }
                      texto={deslocamento.valorBase}
                      font="tormenta20Font"
                      css="botaoQuadrado30px"
                      cor="corSecundaria"
                    />
                  </div>
                  {modalAberto == `DESLOCAMENTO_${deslocamento.nome}_EDICAO_MODAL` &&
                    createPortal(
                      <Modal
                        width="550px"
                        titulo={deslocamento.nome}
                        onClose={() => dispatch(fecharModal())}
                        height="400px"
                      >
                        <></>
                      </Modal>,
                      document.body
                    )}
                </div>
              ))}
            <div className={styles.infoSecundaria}>
              <div className={styles.titulo}>
                <h2 className="tormenta20Font">Iniciativa</h2>
              </div>
              <div className={styles.pericias}>
                {personagem.pericias
                  .filter((pericia) => pericia.nome === 'iniciativa')
                  .map((pericia) => (
                    <Pericia
                      key={pericia.id}
                      pericia={pericia}
                      exibeTreinamento={false}
                      editavel={true}
                    />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
