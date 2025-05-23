import { JSX } from 'react'
import styles from './menu-principal.module.scss'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { useExibirTodosPersonagem } from '@renderer/hooks/selectors/usePersonagemQuery'
import { useNavigate } from 'react-router-dom'
import { selecionarPersonagem } from '@renderer/store/slices/personagemSlice'
import { createPortal } from 'react-dom'
import { Modal } from '@renderer/templates/modal/modal'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { useCriarPersonagemDemo } from '@renderer/hooks/mutations/usePersonagemMutations'

export const MenuPrincipal = (): JSX.Element => {
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  const { data: personagens } = useExibirTodosPersonagem()
  const navigate = useNavigate()
  const criarPersonagemMutation = useCriarPersonagemDemo()

  const selecionarPersonagemPorId = (id: number): void => {
    dispatch(selecionarPersonagem(id))
    navigate('/personagem')
  }

  const criarPersonagem = (): void => {
    criarPersonagemMutation.mutate()
  }

  return (
    <main className={styles.mainMenu}>
      <div className={styles.backdrop}></div>
      <div className={styles.screen}>
        <h1 className="tormenta20Font">Assistente Tormenta20</h1>
        <div className={styles.botoes}>
          <BotaoModular
            font="tormenta20Font"
            css="botaoRetangular200x40"
            cor="corVermelho"
            onClickEvent={() => dispatch(abrirModal('PERSONAGEM_SELECAO_MODAL'))}
            texto="Personagens"
          />
          <BotaoModular
            font="tormenta20Font"
            css="botaoRetangular200x40"
            cor="corVermelho"
            onClickEvent={() => {
              window.open('https://jamboeditora.com.br/', '_blank')
              return false
            }}
            texto="Adquira Tormenta20"
          />
          <BotaoModular
            font="tormenta20Font"
            css="botaoRetangular200x40"
            cor="corVermelho"
            onClickEvent={() => console.log('teste')}
            texto="Sair"
          />
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
                css="botaoRetangular200x40"
                onClickEvent={() => criarPersonagem()}
                texto={'Criar personagem'}
                cor="corVerde"
                font="tormenta20Font"
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
                      <h2 className="tormenta20Font">{personagem.nome}</h2>
                      <div className={styles.statusPersonagem}>
                        <p className="tormenta20Font">Raça: {personagem.raca}</p>
                        <p className="tormenta20Font">Classe: {personagem.classes[0].nome}</p>
                      </div>
                    </div>
                    <p className={styles.nivel}>{personagem.nivel}</p>
                  </div>
                ))}
            </div>
          </Modal>,
          document.body
        )}
    </main>
  )
}
