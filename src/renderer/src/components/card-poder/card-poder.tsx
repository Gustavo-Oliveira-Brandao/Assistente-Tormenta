import styles from '@renderer/assets/styles/cards.module.scss'
import { JSX, useMemo } from 'react'
import { BotaoModular } from '../botao-modular/botao-modular'
import { Button, Disclosure, DisclosurePanel, Heading } from 'react-aria-components'
import { IPoder } from '@renderer/@types/T20 GOTY/IPoder'
import { DeepPartial } from '@renderer/@types/DeepPartial'

type cardPoderProps = {
  poder: IPoder | DeepPartial<IPoder>
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
  exibeCategoria = false,
  exibeFonte = false,
  nivel
}: cardPoderProps): JSX.Element => {

  const descricao = useMemo(() => {
    if (poder.descricao == null) {
      return null
    }

    const regex = /(@\[destaque\]\{)(.*?)(\})/g

    const partes: Array<string | JSX.Element> = []
    let ultimoIndice = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(poder.descricao)) !== null) {
      const conteudo = match[2]

      if (match.index > ultimoIndice) {
        partes.push(poder.descricao.substring(ultimoIndice, match.index))
      }

      partes.push(
        <span key={match.index} className={styles.destaque}>
          {conteudo}
        </span>
      )

      ultimoIndice = match.index + match[0].length
    }
    if (ultimoIndice < poder.descricao.length) {
      partes.push(poder.descricao.substring(ultimoIndice))
    }
    return <p className={`${styles.descricao} inter`}>{partes}</p>
  }, [poder])

  return (
    <Disclosure className={styles.card}>
      <div className={styles.header}>
        <Heading className={styles.titulo}>
          {nivel && <p className={`${styles.valor} tormenta20Font`}>{nivel}</p>}
          <img loading="lazy" src={`./icons/${poder.icone ?? 'arcanista'}.svg`} alt={poder.nome} />

          <Button slot="trigger" className={styles.nome}>
            <h3 className="tormenta20Font">{poder.nome}</h3>
            <h4 className="tormenta20Font">{poder.tempoExecucao}</h4>
          </Button>
        </Heading>
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
      </div>
      {poder && (
        <DisclosurePanel className={styles.conteudo}>
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
          <p className={`${styles.descricao} inter`}>{descricao}</p>
        </DisclosurePanel>
      )}
    </Disclosure>
  )
}
