import { JSX, useState } from 'react'
import styles from './menu-principal.module.scss'
import { useDispatch } from 'react-redux'
import { useExibirTodosPersonagem } from '@renderer/hooks/selectors/usePersonagemQuery'
import { useNavigate } from 'react-router-dom'
import { selecionarPersonagem } from '@renderer/store/slices/personagemSlice'
import { useCriarPersonagemDemo } from '@renderer/hooks/mutations/usePersonagemMutations'
import { exibirPoderesDefault } from '@renderer/api/poder-service'
import { DialogTrigger } from 'react-aria-components'
import { ModalModular } from '@renderer/components/modal/modal'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'

export const MenuPrincipal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [selecaoPersonagensEstaAberta, setSelecaoPersonagensEstaAberta] = useState(false)

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
        <h1 className="tormenta20Font">Arquivos de Tanna-Toh</h1>
        <div className={styles.botoes}>
          <BotaoModular
            font="tormenta20Font"
            css="botaoMenuPrincipal"
            cor="vermelhoEscuro"
            onClickEvent={() => setSelecaoPersonagensEstaAberta(true)}
          >
            <p>Personagens</p>
          </BotaoModular>
          <BotaoModular
            font="tormenta20Font"
            css="botaoMenuPrincipal"
            cor="vermelhoEscuro"
            onClickEvent={() => {
              window.open('https://jamboeditora.com.br/', '_blank')
              return false
            }}
          >
            <p>Adquira Tormenta20</p>
          </BotaoModular>
          <BotaoModular
            font="tormenta20Font"
            css="botaoMenuPrincipal"
            cor="vermelhoEscuro"
            onClickEvent={() => exibirPoderesDefault()}
          >
            <p>Sair</p>
          </BotaoModular>
        </div>
        <p className={`${styles.copyright} geist`}>
          Isso se trata de um produto NÃO-OFICIAL. Tormenta 20 pertence a Jambo Editora. Todos os
          direitos são reservados a editora.
        </p>
      </div>
      <DialogTrigger
        isOpen={selecaoPersonagensEstaAberta}
        onOpenChange={setSelecaoPersonagensEstaAberta}
      >
        <ModalModular
          titulo="Selecionar personagem"
          height="500px"
          width="350px"
          footer={
            <BotaoModular
              css="botaoMenuPrincipal"
              onClickEvent={() => criarPersonagem()}
              cor="verdePrimario"
              font="tormenta20Font"
            >
              <p>Criar personagem</p>
            </BotaoModular>
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
                  </div>
                  <p className={styles.nivel}>{personagem.nivelAtual}</p>
                </div>
              ))}
          </div>
        </ModalModular>
      </DialogTrigger>
    </main>
  )
}
