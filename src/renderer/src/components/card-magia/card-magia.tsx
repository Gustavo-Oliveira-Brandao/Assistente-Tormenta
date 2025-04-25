import { IMagia } from '@renderer/@types/t20/Magia'
import styles from '@renderer/assets/styles/cards-especificos.module.scss'
import Card from '../generic-card/card'

interface CardMagiaProps {
  magia: IMagia
  onInteract?: () => void
  iconeBotaoInteracao?: string
}

const CardMagia = ({ magia, onInteract, iconeBotaoInteracao }: CardMagiaProps): JSX.Element => {
  return (
    <Card
      titulo={magia.nome}
      onInteract={onInteract}
      iconeURL={magia.iconeURL}
      iconeBotaoInteracao={iconeBotaoInteracao}
      css="completo"
    >
      <div className={styles.itemTags}>
        <p>{magia.execucao}</p>
        <p>{magia.tradicao}</p>
        <p>{magia.escola}</p>
      </div>
      <p className={`${styles.descricao} sourceSansPro`}>{magia.descricao}</p>
      {magia.aprimoramentos.length !== 0 && (
        <div className={styles.extras}>
          {magia.aprimoramentos.map((aprimoramento, index) => (
            <div key={index} className={styles.extra}>
              <p>
                {aprimoramento.custo === 0 ? (
                  <span className={styles.destaque}>TRUQUE: </span>
                ) : (
                  <span className={styles.destaque}>+{aprimoramento.custo} PM: </span>
                )}
                <span className="sourceSansPro">{aprimoramento.descricao}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

export default CardMagia
