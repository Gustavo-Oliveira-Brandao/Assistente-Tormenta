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
  inicialmenteExpandido = false
}: CardModularProps): JSX.Element => {
  const [estaExpandido, setEstaExpandido] = useState(inicialmenteExpandido)
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitulo}>
          {iconeURL && <img src={iconeURL} alt={titulo} />}
          <div className={styles.cardInfo}>
            <h2 className="tormenta20Font" onClick={() => setEstaExpandido(!estaExpandido)}>
              {titulo}
            </h2>
          </div>
        </div>
        {onInteract && (
          <BotaoModular
            css="botaoQuadrado30px"
            icone={iconeBotaoInteracao}
            onClickEvent={onInteract}
            cor="corSecundaria"
          />
        )}
      </div>
      {estaExpandido && <div className={styles.cardConteudo}>{children}</div>}
    </div>
  )
}
