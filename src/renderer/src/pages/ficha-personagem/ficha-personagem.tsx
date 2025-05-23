import { useExibirPersonagemPorId } from '@renderer/hooks/selectors/usePersonagemQuery'
import {
  useExibirPoderesDefault,
  useExibirPoderesPersonagem
} from '@renderer/hooks/selectors/usePoderQuery'
import { RootState } from '@renderer/store/store'
import { JSX, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ficha-personagem.module.scss'
import { Sidebar } from '@renderer/templates/sidebar/sidebar'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { BarraRecurso } from '@renderer/components/barra-recurso/barra-recurso'
import { createPortal } from 'react-dom'
import { Modal } from '@renderer/templates/modal/modal'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { Pericia } from '@renderer/components/pericia/pericia'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { CardPoder } from '@renderer/components/card-poder/card-poder'
import { useCriarPoder, useDeletarPoder } from '@renderer/hooks/mutations/usePoderMutation'
import { useExibirMagiasDefault } from '@renderer/hooks/selectors/useMagiaQuery'
import { CardMagia } from '@renderer/components/card-magia/card-magia'
import { useCriarMagia, useDeletarMagia } from '@renderer/hooks/mutations/useMagiaMutation'
import { DeepPartial } from 'typeorm'
import { IMagia } from '@renderer/@types/T20 GOTY/IMagia'

export const FichaPersonagem = (): JSX.Element => {
  const idPersonagem = useSelector((state: RootState) => state.personagem.idPersonagem)

  const { data: personagem } = useExibirPersonagemPorId(idPersonagem)
  const { data: poderes } = useExibirPoderesPersonagem(idPersonagem)
  const { data: poderesDefault } = useExibirPoderesDefault()
  const { data: magiasDefault } = useExibirMagiasDefault()
  const adicionarMagia = useCriarMagia()
  const removerMagia = useDeletarMagia()
  const adicionarPoder = useCriarPoder()
  const removerPoder = useDeletarPoder()
  const [aba, setAba] = useState('ATRIBUTOS')
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  return (
    <main>
      {personagem && (
        <>
          <section className={styles.ficha}>
            <Sidebar>
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
                    <img src={`./icons/${personagem.classes[0].nome}.svg`} alt="Classe" />
                    <p className="tormenta20Font">{personagem.classes[0].nome}</p>
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
                  <p className="tormenta20Font">{personagem.nivel}</p>
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
                      <BarraRecurso recurso={recurso} height="30px" />
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
                          onClickEvent={() =>
                            dispatch(abrirModal(`RECURSO_${recurso.categoria}_EDICAO_MODAL`))
                          }
                          texto={recurso.valorMaximo}
                          font="tormenta20Font"
                          css="botaoQuadrado30px"
                          cor="corSecundaria"
                        />
                      </div>
                      {modalAberto == `RECURSO_${recurso.categoria}_EDICAO_MODAL` &&
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
                          width="90%"
                          height="40px"
                          exibeTreinamento={false}
                          editavel={true}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </Sidebar>
            <div className={styles.conteudo}>
              <nav className={styles.navButtons}>
                <BotaoModular
                  css="botaoExpansivel"
                  icone="./icons/arsenal.svg"
                  onClickEvent={() => setAba('ATRIBUTOS')}
                  estaAtivo={aba == 'ATRIBUTOS' ? true : false}
                  texto={aba == 'ATRIBUTOS' ? 'ATRIBUTOS' : undefined}
                  cor="corPrimaria"
                  font="tormenta20Font"
                />
                <BotaoModular
                  css="botaoExpansivel"
                  icone="./icons/thyatis.svg"
                  onClickEvent={() => setAba('PODERES')}
                  estaAtivo={aba == 'PODERES' ? true : false}
                  texto={aba == 'PODERES' ? 'PODERES' : undefined}
                  cor="corPrimaria"
                  font="tormenta20Font"
                />
                <BotaoModular
                  css="botaoExpansivel"
                  icone="./icons/tanna-toh.svg"
                  onClickEvent={() => setAba('MAGIAS')}
                  estaAtivo={aba == 'MAGIAS' ? true : false}
                  texto={aba == 'MAGIAS' ? 'MAGIAS' : undefined}
                  cor="corPrimaria"
                  font="tormenta20Font"
                />
              </nav>
              {aba == 'ATRIBUTOS' && (
                <>
                  <SecaoFicha
                    header={<h2 className="tormenta20Font">Atributos</h2>}
                    css="atributos"
                  >
                    {personagem.atributos
                      .sort((a, b) => a.ordem - b.ordem)
                      .map((atributo) => (
                        <div className={styles.atributo} key={atributo.id}>
                          <div className={styles.titulo}>
                            <BotaoModular
                              font="tormenta20Font"
                              onClickEvent={() =>
                                dispatch(abrirModal(`ATRIBUTO_${atributo.nome}_EDICAO_MODAL`))
                              }
                              texto={atributo.nome}
                              css="simples"
                              cor="transparente"
                            />
                          </div>
                          <BotaoModular
                            css="rollBtn"
                            cor="transparente"
                            icone="./icons/d20 cinza.svg"
                            onClickEvent={() => console.log('teste')}
                            font="tormenta20Font"
                            texto={atributo.valorBase}
                          />
                          {modalAberto === `ATRIBUTO_${atributo.nome}_EDICAO_MODAL` &&
                            createPortal(
                              <Modal
                                titulo={atributo.nome}
                                onClose={() => dispatch(fecharModal())}
                                height="fit-content"
                                width="400px"
                              >
                                <></>
                              </Modal>,
                              document.body
                            )}
                        </div>
                      ))}
                  </SecaoFicha>
                  <SecaoFicha
                    header={<h2 className="tormenta20Font">Pericias de combate</h2>}
                    css="pericias"
                  >
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'combate')
                      .map((pericia) => (
                        <Pericia
                          key={pericia.id}
                          pericia={pericia}
                          height="40px"
                          width="100%"
                          exibeTreinamento={true}
                          editavel={true}
                        />
                      ))}
                  </SecaoFicha>
                  <SecaoFicha
                    header={<h2 className="tormenta20Font">Testes de resistência</h2>}
                    css="pericias"
                  >
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'testeResistencia')
                      .map((pericia) => (
                        <Pericia
                          key={pericia.id}
                          pericia={pericia}
                          exibeTreinamento={true}
                          editavel={true}
                          height="40px"
                          width="100%"
                        />
                      ))}
                  </SecaoFicha>
                  <SecaoFicha
                    header={<h2 className="tormenta20Font">Pericias gerais</h2>}
                    css="pericias"
                  >
                    {personagem.pericias
                      .filter((pericia) => pericia.categoria === 'geral')
                      .map((pericia) => (
                        <Pericia
                          key={pericia.id}
                          pericia={pericia}
                          height="40px"
                          width="100%"
                          exibeTreinamento={true}
                          editavel={true}
                        />
                      ))}
                  </SecaoFicha>
                </>
              )}
              {aba === 'PODERES' && (
                <>
                  <SecaoFicha
                    header={
                      <>
                        <h2 className="tormenta20Font">Poderes</h2>
                        <BotaoModular
                          css="minimalista"
                          texto="Buscar poderes"
                          onClickEvent={() => dispatch(abrirModal(`PODERES_LOJA_MODAL`))}
                          icone="./icons/busca.svg"
                          cor="transparente"
                          font="tormenta20Font"
                        />
                      </>
                    }
                    css="poderes"
                  >
                    {poderes &&
                      poderes.map((poder, index) => (
                        <CardPoder
                          key={index}
                          iconeBotaoInteracao="./icons/delete.svg"
                          onInteract={() => removerPoder.mutate(poder.id)}
                          poder={poder}
                        />
                      ))}
                  </SecaoFicha>
                  {modalAberto === 'PODERES_LOJA_MODAL' &&
                    createPortal(
                      <Modal
                        titulo="Adquirir poderes"
                        onClose={() => dispatch(fecharModal())}
                        height="400px"
                        width="550px"
                      >
                        {poderesDefault &&
                          poderesDefault.map((poder, index) => (
                            <CardPoder
                              key={index}
                              iconeBotaoInteracao="./icons/adicao.svg"
                              onInteract={() => adicionarPoder.mutate({ poder, idPersonagem })}
                              poder={poder}
                            />
                          ))}
                      </Modal>,
                      document.body
                    )}
                </>
              )}
              {aba === 'MAGIAS' && (
                <>
                  <SecaoFicha
                    header={
                      <>
                        <h2 className="tormenta20Font">Magias</h2>
                        <BotaoModular
                          css="minimalista"
                          texto="Buscar magias"
                          cor="transparente"
                          font="tormenta20Font"
                          onClickEvent={() => dispatch(abrirModal(`MAGIAS_LOJA_MODAL`))}
                          icone="./icons/busca.svg"
                        />
                      </>
                    }
                    css="poderes"
                  >
                    {magiasDefault &&
                      magiasDefault.map((magia: IMagia, index) => (
                        <CardMagia
                          key={index}
                          magia={magia}
                          iconeBotaoInteracao="./icons/delete.svg"
                          onInteract={() => removerMagia.mutate(magia.key)}
                        />
                      ))}
                  </SecaoFicha>
                  {modalAberto === 'MAGIAS_LOJA_MODAL' &&
                    createPortal(
                      <Modal
                        titulo="Adicionar magias"
                        onClose={() => dispatch(fecharModal())}
                        height="400px"
                        width="550px"
                      >
                        {magiasDefault &&
                          magiasDefault.map((magia, index) => (
                            <CardMagia
                              key={index}
                              magia={magia}
                              iconeBotaoInteracao="./icons/adicao.svg"
                              onInteract={() => removerMagia.mutate(magia.key)}
                            />
                          ))}
                      </Modal>,
                      document.body
                    )}
                </>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
