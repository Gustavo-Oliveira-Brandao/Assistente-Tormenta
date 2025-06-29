import styles from '@renderer/assets/styles/cards.module.scss'
import { JSX } from 'react'
import { BotaoModular } from '../botao-modular/botao-modular'
import { AccordionCard } from '../accordion-card/accordion-card'
import { IMagiaPersonagem } from '@renderer/@types/T20 GOTY/IMagia'
import { DeepPartial } from 'typeorm'

type cardMagiaProps = {
  magia: IMagiaPersonagem | DeepPartial<IMagiaPersonagem>
  onInteract?: () => void
  iconeBotaoInteracao?: string
}
export const CardMagia = (props: cardMagiaProps): JSX.Element => {
  return (
    <AccordionCard
      titulo={props.magia.nome ?? 'Magia sem nome'}
      icone={`./icons/${props.magia.escola?.toLowerCase()}.svg`}
      inicialmenteExpandido={false}
      header={
        props.onInteract && (
          <BotaoModular
            css="botaoAcaoPequeno"
            icone={props.iconeBotaoInteracao}
            onClickEvent={props.onInteract}
            cor="cinzaEscuro03"
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
        <p className={`${styles.descricao} geist`}>{props.magia.descricao}</p>
        {props.magia.aprimoramentos && props.magia.aprimoramentos.length !== 0 && (
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
