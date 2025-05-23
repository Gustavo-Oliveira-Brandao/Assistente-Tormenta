import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import styles from '@renderer/assets/styles/cards.module.scss'
import { JSX } from 'react'
import { CardModular } from '../card-modular/card-modular'

type cardPoderProps = {
  poder: IPoder
  onInteract?: () => void
  iconeBotaoInteracao?: string
}

export const CardPoder = ({
  poder,
  onInteract,
  iconeBotaoInteracao
}: cardPoderProps): JSX.Element => {
  return (
    <CardModular
      titulo={poder.nome}
      onInteract={onInteract}
      iconeBotaoInteracao={iconeBotaoInteracao}
      css="padrao"
    >
      <div className={styles.itemTags}>
        <p className="tormenta20Font">{poder.tempoExecucao}</p>
        <p className="tormenta20Font">{poder.categoria}</p>
        {poder.tags.map((tag, index) => (
          <p className="tormenta20Font" key={index}>
            {tag.label}
          </p>
        ))}
      </div>
      <p className={`${styles.descricao} sourceSansPro`}>{poder.descricao}</p>
      {poder.subEfeitos.length !== 0 && (
        <div className={styles.subEfeitos}>
          {poder.subEfeitos.map((subEfeito, index) => (
            <div key={index} className={styles.subEfeito}>
              <p>
                <span className={styles.destaque + ' tormenta20Font'}>{subEfeito.nome} </span>
                <span className="sourceSansPro">{subEfeito.descricao}</span>
              </p>
            </div>
          ))}
        </div>
      )}
      {poder.preRequisitos !== '' && (
        <p className={styles.preRequisitos}>
          <span className={styles.destaque}>Pré requisitos: </span>
          <span className="sourceSansPro">{poder.preRequisitos}</span>
        </p>
      )}
    </CardModular>
  )
}
