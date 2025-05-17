import classNames from 'classnames'
import { JSX, ReactNode, useState } from 'react'
import styles from './card-modular.module.scss'
import { BotaoModular } from '../botao-modular/botao-modular'

type CardModularProps = {
  titulo: string
  onInteract?: () => void
  iconeURL?: string
  iconeBotaoInteracao?: string
  children: ReactNode
  css: string
  inicialmenteExpandido?: boolean
}

export const CardModular = ({
  titulo,
  onInteract,
  iconeURL,
  iconeBotaoInteracao,
  children,
  css,
  inicialmenteExpandido = false
}: CardModularProps): JSX.Element => {
  const [estaExpandido, setEstaExpandido] = useState(inicialmenteExpandido)
  const [cardClass] = classNames(styles[css], styles.card)
  return (
    <div className={cardClass}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitulo}>
          {iconeURL && <img src={iconeURL} alt={titulo} />}
          <div className={styles.cardInfo}>
            <h2 onClick={() => setEstaExpandido(!estaExpandido)}>{titulo}</h2>
          </div>
        </div>
        {onInteract && (
          <BotaoModular
            css="botaoQuadrado30px"
            icone={iconeBotaoInteracao}
            onClickEvent={onInteract}
          />
        )}
      </div>
      {estaExpandido && <div className={styles.cardConteudo}>{children}</div>}
    </div>
  )
}
