import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import styles from '@renderer/assets/styles/cards.module.scss'
import { JSX } from 'react'
import { BotaoModular } from '../botao-modular/botao-modular'
import { AccordionCard } from '../accordion-card/accordion-card'
import { DeepPartial } from 'typeorm'

type cardPoderProps = {
  poder: IPoder | DeepPartial<IPoder>
  onInteract?: () => void
  iconeBotaoInteracao?: string
}

export const CardPoder = ({
  poder,
  onInteract,
  iconeBotaoInteracao
}: cardPoderProps): JSX.Element => {
  return (
    <AccordionCard
      titulo={poder.nome ?? 'Poder sem nome'}
      inicialmenteExpandido={false}
      icone={`./icons/arcanista.svg`}
      header={
        onInteract && (
          <BotaoModular
            css="botaoQuadrado30px"
            icone={iconeBotaoInteracao}
            onClickEvent={onInteract}
            cor="corSecundaria"
          />
        )
      }
    >
      {poder && (
        <>
          <div className={styles.itemTags}>
            <p className="tormenta20Font">{poder.tempoExecucao}</p>
            <p className="tormenta20Font">{poder.categoria}</p>
            {poder.tags &&
              poder.tags.map((tag, index) => (
                <p className="tormenta20Font" key={index}>
                  {tag.label}
                </p>
              ))}
          </div>
          <p className={`${styles.descricao} sourceSansPro`}>{poder.descricao}</p>
          {poder.subEfeitos && poder.subEfeitos.length !== 0 && (
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
        </>
      )}
    </AccordionCard>
  )
}
