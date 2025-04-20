import { IPoder } from '@renderer/@types/t20/Poder'
import styles from '@renderer/assets/styles/cards-especificos.module.scss'
import Card from '../generic-card/card'

interface CardPoderProps {
  poder: IPoder
  onInteract?: () => void
  iconeBotaoInteracao: string
}

const CardPoder = ({ poder, onInteract, iconeBotaoInteracao }: CardPoderProps): JSX.Element => {
  return (
    <Card
      titulo={poder.nome}
      onInteract={onInteract}
      iconeURL={poder.iconeURL}
      iconeBotaoInteracao={iconeBotaoInteracao}
    >
      <div className={styles.itemTags}>
        <p>{poder.tempoExecucao}</p>
        <p> {poder.categoria}</p>
        {poder.tags.map((tag, index) => (
          <p key={index}>{tag.label}</p>
        ))}
      </div>
      <p className={`${styles.descricao} sourceSansPro`}>{poder.descricao}</p>
      {poder.extras.length !== 0 && (
        <div className={styles.poderExtras}>
          {poder.extras.map((extra, index) => (
            <div key={index} className={styles.poderExtra}>
              <p>
                <span className={styles.destaque}>{extra.titulo}</span>{' '}
                <span className="sourceSansPro">{extra.texto}</span>
              </p>
            </div>
          ))}
        </div>
      )}
      {poder.preRequisitos !== '' && (
        <p className={styles.preRequisitos}>
          <span className={styles.destaque}>Pré requisitos:</span>{' '}
          <span className="sourceSansPro">{poder.preRequisitos}</span>
        </p>
      )}
    </Card>
  )
}

export default CardPoder
