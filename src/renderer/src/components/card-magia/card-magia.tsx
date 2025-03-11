import { IMagia } from '@renderer/@types/t20/Magia'
import styles from '@renderer/assets/styles/card-item.module.scss'
import { useState } from 'react'
import BotaoModular from '../botao-modular/botao-modular'

const CardMagia = ({
  magia,
  onInteract,
  iconeBotaoInteracao
}: {
  magia: IMagia
  onInteract?: () => void
  iconeBotaoInteracao: string
}): JSX.Element => {
  const [estaExpandido, setEstaExpandido] = useState(false)

  return (
    <div className={styles.item}>
      <div className={styles.itemHeader}>
        <div className={styles.itemTitulo}>
          <img src={magia.iconeURL} alt={magia.nome} loading="lazy" />
          <div className={styles.itemInfo}>
            <h2 onClick={() => setEstaExpandido(!estaExpandido)}>{magia.nome}</h2>
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
      {estaExpandido && (
        <div className={styles.itemConteudo}>
          <div className={styles.itemTags}>
            <p>{magia.execucao}</p>
            <p>{magia.tradição}</p>
            <p>{magia.escola}</p>
          </div>
          <p className={`${styles.poderDescricao} ${styles.poppins}`}>{magia.descricao}</p>
        </div>
      )}
    </div>
  )
}

export default CardMagia
