import { Poder } from '@renderer/@types/t20/Poder'
import styles from '@renderer/assets/styles/card-item.module.scss'
import { useState } from 'react'
import BotaoModular from '../botao-modular/botao-modular'

const CardPoder = ({
  poder,
  onInteract,
  iconeBotaoInteracao
}: {
  poder: Poder
  onInteract?: () => void
  iconeBotaoInteracao: string
}): JSX.Element => {
  const [estaExpandido, setEstaExpandido] = useState(false)

  return (
    <div className={styles.item}>
      <div className={styles.itemHeader}>
        <div className={styles.itemTitulo}>
          <img src={poder.iconeURL} alt={poder.nome} loading="lazy" />
          <div className={styles.itemInfo}>
            <h2 onClick={() => setEstaExpandido(!estaExpandido)}>{poder.nome}</h2>
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
          <div className={styles.itemBotoes}>
            <BotaoModular
              css="botaoTag"
              texto={poder.tempoExecucao}
              onClickEvent={() => setEstaExpandido(false)}
            />
            <BotaoModular
              css="botaoTag"
              texto={poder.categoria}
              onClickEvent={() => setEstaExpandido(false)}
            />
            {poder.tags.map((tag, index) => (
              <BotaoModular
                key={index}
                css="botaoTag"
                texto={tag.label}
                onClickEvent={() => setEstaExpandido(false)}
              />
            ))}
          </div>
          <p className={`${styles.poderDescricao} ${styles.poppins}`}>{poder.descricao}</p>
          {poder.topicos.length !== 0 && (
            <div className={styles.poderTopicos}>
              {poder.topicos.map((topico, index) => (
                <div key={index} className={styles.poderTopico}>
                  <p>
                    <span className={styles.destaque}>{topico.titulo}</span>{' '}
                    <span className={styles.poppins}>{topico.texto}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
          {poder.preRequisitos !== '' && (
            <p className={styles.preRequisitos}>
              <span className={styles.destaque}>Pré requisitos:</span>{' '}
              <span className={styles.poppins}>{poder.preRequisitos}</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default CardPoder
