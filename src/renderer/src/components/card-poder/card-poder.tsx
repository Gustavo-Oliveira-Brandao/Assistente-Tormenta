import styles from '@renderer/assets/styles/cards.module.scss'
import { JSX } from 'react'
import { AccordionCard } from '../accordion-card/accordion-card'
import { IPoderPersonagem } from '@renderer/@types/T20 GOTY/IPoder'
import { DeepPartial } from 'typeorm'
import { BotaoModular } from '../botao-modular/botao-modular'

type cardPoderProps = {
  poder: IPoderPersonagem | DeepPartial<IPoderPersonagem>
  onInteract?: () => void
  exibeCategoria?: boolean
  exibeFonte?: boolean
  iconeBotaoInteracao?: string
  nivel?: number
}

export const CardPoder = ({
  poder,
  onInteract,
  iconeBotaoInteracao,
  nivel,
  exibeCategoria = false,
  exibeFonte = false
}: cardPoderProps): JSX.Element => {
  return (
    <AccordionCard
      titulo={poder.nome ?? 'Poder sem nome'}
      subtitulo={poder.tempoExecucao}
      inicialmenteExpandido={false}
      icone={`./icons/${poder.icone ?? 'arcanista'}.svg`}
      numero={nivel}
      header={
        <div className={styles.interacoes}>
          {exibeCategoria && (
            <p className={`${styles.categoria} tormenta20Font`}>{poder.categoria}</p>
          )}
          {exibeFonte && <p className={`${styles.categoria} tormenta20Font`}>{poder.fonte}</p>}
          {onInteract && (
            <BotaoModular css="botaoAcaoPequeno" onClickEvent={onInteract} cor="cinzaEscuro03">
              <img src={iconeBotaoInteracao} alt={poder.nome} />
            </BotaoModular>
          )}
        </div>
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
          <p className={`${styles.descricao} geist`}>{poder.descricao}</p>
          {poder.subEfeitos && poder.subEfeitos.length !== 0 && (
            <div className={styles.subEfeitos}>
              {poder.subEfeitos.map((subEfeito, index) => (
                <div key={index} className={styles.subEfeito}>
                  <p>
                    <span className={styles.destaque + ' geist'}>{subEfeito.nome} </span>
                    <span className="geist">{subEfeito.descricao}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
          {poder.preRequisitos !== '' && (
            <p className={styles.preRequisitos}>
              <span className={`${styles.destaque} geist`}>Pré requisitos: </span>
              <span className="geist">{poder.preRequisitos}</span>
            </p>
          )}
        </>
      )}
    </AccordionCard>
  )
}
