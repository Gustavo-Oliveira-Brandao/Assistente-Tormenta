import { JSX } from 'react'
import styles from './menu-principal.module.scss'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'

export const MenuPrincipal = (): JSX.Element => {
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
            onClickEvent={() => console.log('teste')}
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
    </main>
  )
}
