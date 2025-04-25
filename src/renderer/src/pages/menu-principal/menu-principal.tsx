import BotaoModular from '@renderer/components/botao-modular/botao-modular'
import styles from './menu-principal.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { RootState } from '@renderer/store/store'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { useExibirTodosPersonagensQuery } from '@renderer/hooks/queries/personagem/useExibirTodosPersonagensQuery'
import { selecionarPersonagem } from '@renderer/store/slices/personagemSlice'
import { useNavigate } from 'react-router-dom'
import { PersonagemForm } from '@renderer/components/forms/personagem-form'
import { useState } from 'react'

export const MenuPrincipal = (): JSX.Element => {
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)
  const { data: personagens } = useExibirTodosPersonagensQuery()
  const navigate = useNavigate()

  const selecionarPersonagemPorId = (id: number): void => {
    dispatch(selecionarPersonagem(id))
    navigate('/personagem')
  }

  const [etapaFormulario, setEtapaFormulario] = useState('bio')

  return (
    <main className={styles.mainMenu}>
      <div className={styles.backdrop}></div>
      <div className={styles.screen}>
        <h1>Assistente Tormenta20</h1>
        <div className={styles.botoes}>
          <BotaoModular
            css="botaoAba"
            onClickEvent={() => dispatch(abrirModal(`PERSONAGEM_SELECAO_MODAL`))}
            texto="Personagens"
          />
          <BotaoModular
            css="botaoAba"
            onClickEvent={() => {
              window.open('https://jamboeditora.com.br/', '_blank')
              return false
            }}
            texto="Adquira Tormenta20"
          />
          <BotaoModular css="botaoAba" onClickEvent={() => console.log('')} texto="Sair" />
        </div>
        <p className={`${styles.copyright} sourceSansPro`}>
          Isso se trata de um produto NÃO-OFICIAL. Tormenta 20 pertence a Jambo Editora. Todos os
          direitos são reservados a editora.
        </p>
      </div>
      {modalAberto === 'PERSONAGEM_SELECAO_MODAL' &&
        createPortal(
          <Modal
            titulo="Selecionar personagem"
            onClose={() => dispatch(fecharModal())}
            height="500px"
            width="350px"
            footer={
              <BotaoModular
                css="botaoConfirm"
                onClickEvent={() => dispatch(abrirModal(`PERSONAGEM_CRIACAO_MODAL`))}
                texto="Criar personagem"
              />
            }
          >
            <div className={styles.selecaoPersonagem}>
              {personagens &&
                personagens.map((personagem) => (
                  <div
                    role="button"
                    key={personagem.id}
                    className={styles.personagem}
                    onClick={() => selecionarPersonagemPorId(personagem.id)}
                  >
                    <img src="./character.png" alt={personagem.nome} />
                    <div className={styles.detalhesPersonagem}>
                      <h2>{personagem.nome}</h2>
                      <div className={styles.statusPersonagem}>
                        <p>Raça: {personagem.raca}</p>
                        <p>Classe: {personagem.classe}</p>
                      </div>
                    </div>
                    <p className={styles.nivel}>{personagem.nivel}</p>
                  </div>
                ))}
            </div>
          </Modal>,
          document.body
        )}
      {modalAberto === 'PERSONAGEM_CRIACAO_MODAL' &&
        createPortal(
          <Modal
            titulo="Criar personagem"
            onClose={() => dispatch(abrirModal('PERSONAGEM_SELECAO_MODAL'))}
            height="400px"
            width="800px"
            overflow="hidden"
            footer={
              <>
                {etapaFormulario === 'bio' && (
                  <div>
                    <BotaoModular
                      css="botaoConfirm"
                      texto="Raça"
                      onClickEvent={() => setEtapaFormulario('raca')}
                    />
                  </div>
                )}
                {etapaFormulario === 'raca' && (
                  <div className={styles.spaceBetween}>
                    <BotaoModular
                      css="botaoConfirm"
                      texto="Detalhes"
                      onClickEvent={() => setEtapaFormulario('bio')}
                    />
                    <BotaoModular
                      css="botaoConfirm"
                      texto="Classe"
                      onClickEvent={() => setEtapaFormulario('classe')}
                    />
                  </div>
                )}
                {etapaFormulario === 'classe' && (
                  <div className={styles.spaceBetween}>
                    <BotaoModular
                      css="botaoConfirm"
                      texto="Raça"
                      onClickEvent={() => setEtapaFormulario('raca')}
                    />
                    <BotaoModular
                      css="botaoConfirm"
                      texto="Atributos"
                      onClickEvent={() => setEtapaFormulario('atributos')}
                    />
                  </div>
                )}
                {etapaFormulario === 'atributos' && (
                  <div className={styles.spaceBetween}>
                    <BotaoModular
                      css="botaoConfirm"
                      texto="classe"
                      onClickEvent={() => setEtapaFormulario('classe')}
                    />
                  </div>
                )}
              </>
            }
          >
            <PersonagemForm etapaFormulario={etapaFormulario} />
          </Modal>,
          document.body
        )}
    </main>
  )
}
