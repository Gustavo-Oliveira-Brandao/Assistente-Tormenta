import { IMagia } from '@renderer/@types/T20 GOTY/IMagia'
import styles from '@renderer/assets/styles/cards.module.scss'
import { JSX } from 'react'
import { CardModular } from '../card-modular/card-modular'

type cardMagiaProps = {
  magia: IMagia
  onInteract?: () => void
  iconeBotaoInteracao?: string
}
export const CardMagia = (props: cardMagiaProps): JSX.Element => {
  return (
    <CardModular
      css="padrao"
      titulo={props.magia.nome}
      onInteract={props.onInteract}
      iconeBotaoInteracao={props.iconeBotaoInteracao}
      iconeURL={`./icons/${props.magia.escola}.svg`.toLowerCase()}
    >
      <div className={styles.itemTags}>
        <p className="tormenta20Font">Ação {props.magia.execucao}</p>
        <p className="tormenta20Font">{props.magia.tradicao}</p>
        <p className="tormenta20Font">{props.magia.escola}</p>
      </div>
      <p className={`${styles.descricao} sourceSansPro`}>{props.magia.descricao}</p>
      {props.magia.aprimoramentos.length !== 0 && (
        <div className={styles.extras}>
          {props.magia.aprimoramentos.map((aprimoramento, index) => (
            <div key={index} className={styles.aprimoramentos}>
              <p className="sourceSansPro">
                {aprimoramento.custo === 0 ? (
                  <span className={styles.destaque}>Truque: </span>
                ) : (
                  <span className={styles.destaque}>+{aprimoramento.custo} PM: </span>
                )}
                <span className="sourceSansPro">{aprimoramento.descricao}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </CardModular>
  )
}
