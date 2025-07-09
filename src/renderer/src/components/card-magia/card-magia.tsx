import styles from '@renderer/assets/styles/cards.module.scss'
import { JSX } from 'react'
import { IMagiaPersonagem } from '@renderer/@types/T20 GOTY/IMagia'
import { DeepPartial } from 'typeorm'
import { BotaoModular } from '../botao-modular/botao-modular'
import { Button, Disclosure, DisclosurePanel, Heading } from 'react-aria-components'

type cardMagiaProps = {
  magia: IMagiaPersonagem | DeepPartial<IMagiaPersonagem>
  onInteract?: () => void
  iconeBotaoInteracao?: string
}
export const CardMagia = (props: cardMagiaProps): JSX.Element => {
  return (
    <Disclosure className={styles.card}>
      <div className={styles.header}>
        <Heading className={styles.titulo}>
          <img
            loading="lazy"
            src={`./icons/${props.magia.escola?.toLowerCase()}.svg`}
            alt={props.magia.nome}
          />
          <Button slot="trigger" className={styles.nome}>
            <h3 className="tormenta20Font">{props.magia.nome}</h3>
            <h4 className="tormenta20Font">{props.magia.execucao}</h4>
          </Button>
        </Heading>
        <div className={styles.interacoes}>
          <p className={`${styles.categoria} tormenta20Font`}>{props.magia.escola}</p>
          {props.onInteract && (
            <BotaoModular
              css="botaoAcaoPequeno"
              onClickEvent={props.onInteract}
              cor="cinzaEscuro03"
            >
              <img src={props.iconeBotaoInteracao} alt={props.magia.nome} />
            </BotaoModular>
          )}
        </div>
      </div>
      <DisclosurePanel className={styles.conteudo}>
        <div className={styles.itemTags}>
          <p className="tormenta20Font">Ação {props.magia.execucao}</p>
          <p className="tormenta20Font">{props.magia.tradicao}</p>
          <p className="tormenta20Font">{props.magia.escola}</p>
        </div>
        <p className={`${styles.descricao} inter`}>{props.magia.descricao}</p>
        {props.magia.aprimoramentos && props.magia.aprimoramentos.length !== 0 && (
          <div className={styles.subEfeitos}>
            {props.magia.aprimoramentos.map((aprimoramento, index) => (
              <div key={index} className={styles.subEfeito}>
                <p className="inter">
                  {aprimoramento.custo === 0 ? (
                    <span className={styles.destaque}>Truque: </span>
                  ) : (
                    <span className={styles.destaque}>+{aprimoramento.custo} PM: </span>
                  )}
                  <span className="inter">{aprimoramento.descricao}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </DisclosurePanel>
    </Disclosure>
  )
}
