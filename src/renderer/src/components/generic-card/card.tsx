import { ReactNode, useState } from 'react'
import styles from './card.module.scss'
import BotaoModular from '../botao-modular/botao-modular'

interface CardProps {
  titulo: string
  onInteract?: () => void
  iconeURL?: string
  iconeBotaoInteracao: string
  children: ReactNode
}

const Card = ({
  titulo,
  onInteract,
  iconeURL,
  iconeBotaoInteracao,
  children
}: CardProps): JSX.Element => {
  const [estaExpandido, setEstaExpandido] = useState(false)

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitulo}>
          <img src={iconeURL} alt={titulo} loading="lazy" />
          <div className={styles.cardInfo}>
            <h2 onClick={() => setEstaExpandido(!estaExpandido)}>{titulo}</h2>
          </div>
        </div>
        {onInteract && (
          <BotaoModular
            css="botaoInteracao"
            icone={iconeBotaoInteracao}
            onClickEvent={onInteract}
          />
        )}
      </div>
      {estaExpandido && <div className={styles.cardConteudo}>{children}</div>}
    </div>
  )
}

export default Card
