import styles from '@renderer/assets/styles/cards.module.scss'
import btnStyles from '@renderer/assets/styles/botoes.module.scss'
import { JSX, useMemo } from 'react'
import { Button, Disclosure, DisclosurePanel, Heading } from 'react-aria-components'
import { DeepPartial } from '@renderer/@types/DeepPartial'
import { IMagia } from '@renderer/@types/T20 GOTY/IMagia'

type cardMagiaProps = {
  magia: IMagia | DeepPartial<IMagia>
  onInteract?: () => void
  iconeBotaoInteracao?: string
}
export const CardMagia = (props: cardMagiaProps): JSX.Element => {
  const descricao = useMemo(() => {
    if (props.magia.descricao == null) {
      return null
    }

    const regex = /(@\[destaque\]\{)(.*?)(\})/g

    const partes: Array<string | JSX.Element> = []
    let ultimoIndice = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(props.magia.descricao)) !== null) {
      const conteudo = match[2]

      if (match.index > ultimoIndice) {
        partes.push(props.magia.descricao.substring(ultimoIndice, match.index))
      }

      partes.push(
        <span key={match.index} className={styles.destaque}>
          {conteudo}
        </span>
      )

      ultimoIndice = match.index + match[0].length
    }
    if (ultimoIndice < props.magia.descricao.length) {
      partes.push(props.magia.descricao.substring(ultimoIndice))
    }
    return <p className={`${styles.descricao} inter`}>{partes}</p>
  }, [props.magia])

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
            <h3 className="inter">{props.magia.nome}</h3>
            <h4 className="inter">{props.magia.execucao}</h4>
          </Button>
        </Heading>
        <div className={styles.interacoes}>
          <p className={`${styles.categoria} tormenta20Font`}>{props.magia.escola}</p>
          {props.onInteract && (
            <Button className={btnStyles.botaoAcao} onPress={props.onInteract}>
              <img src={props.iconeBotaoInteracao} alt={props.magia.nome} />
            </Button>
          )}
        </div>
      </div>
      <DisclosurePanel className={styles.conteudo}>
        <div className={styles.itemTags}>
          <p className="tormenta20Font">Ação {props.magia.execucao}</p>
          <p className="tormenta20Font">{props.magia.tradicao}</p>
          <p className="tormenta20Font">{props.magia.escola}</p>
        </div>
        {descricao}
        {props.magia.aprimoramentos && props.magia.aprimoramentos.length !== 0 && (
          <div className={styles.subEfeitos}>
            {props.magia.aprimoramentos.map((aprimoramento, index) => (
              <div key={index} className={styles.subEfeito}>
                <p className="inter">
                  {aprimoramento.custo === 0 ? (
                    <span className={styles.destaque}>TRUQUE: </span>
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
