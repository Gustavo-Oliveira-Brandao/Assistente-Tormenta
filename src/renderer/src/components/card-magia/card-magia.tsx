import styles from '@renderer/assets/styles/cards.module.scss'
import { JSX } from 'react'
import { BotaoModular } from '../botao-modular/botao-modular'
import { AccordionCard } from '../accordion-card/accordion-card'
import { IMagiaDB } from '@renderer/@types/T20 GOTY/IMagia'

type cardMagiaProps = {
  magia: IMagiaDB
  onInteract?: () => void
  iconeBotaoInteracao?: string
}
export const CardMagia = (props: cardMagiaProps): JSX.Element => {
  return (
    <AccordionCard
      titulo={props.magia.nome}
      icone={`./icons/${props.magia.escola}.svg`}
      inicialmenteExpandido={false}
      header={
        props.onInteract && (
          <BotaoModular
            css="botaoQuadrado30px"
            icone={props.iconeBotaoInteracao}
            onClickEvent={props.onInteract}
            cor="corSecundaria"
          />
        )
      }
    >
      <>
        <div className={styles.itemTags}>
          <p className="tormenta20Font">Ação {props.magia.execucao}</p>
          <p className="tormenta20Font">{props.magia.tradicao}</p>
          <p className="tormenta20Font">{props.magia.escola}</p>
        </div>
        <p className={`${styles.descricao} sourceSansPro`}>{props.magia.descricao}</p>
        {props.magia.aprimoramentos.length !== 0 && (
          <div className={styles.subEfeitos}>
            {props.magia.aprimoramentos.map((aprimoramento, index) => (
              <div key={index} className={styles.subEfeito}>
                <p className="geist">
                  {aprimoramento.custo === 0 ? (
                    <span className={styles.destaque}>Truque: </span>
                  ) : (
                    <span className={styles.destaque}>+{aprimoramento.custo} PM: </span>
                  )}
                  <span className="geist">{aprimoramento.descricao}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </>
    </AccordionCard>
  )
}
