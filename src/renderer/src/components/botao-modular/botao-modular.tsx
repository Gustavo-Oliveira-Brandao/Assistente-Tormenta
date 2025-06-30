import classNames from 'classnames'
import { JSX, ReactNode } from 'react'
import styles from './botao-modular.module.scss'
import { Button } from 'react-aria-components'

type BotaoModularProps = {
  css: string
  cor?: string
  font?: string
  children: ReactNode
  slot?: string | null
  estaAtivo?: boolean
  onClickEvent?: () => void
}

export const BotaoModular = ({
  css,
  children,
  onClickEvent,
  font,
  cor,
  slot = null,
  estaAtivo
}: BotaoModularProps): JSX.Element => {
  const btnClass = classNames(styles[css], font, {
    [styles[cor ?? '']]: cor != null,
    [styles.ativo]: estaAtivo
  })

  return (
    <Button slot={slot} type="button" onPress={onClickEvent} className={btnClass}>
      {children}
    </Button>
  )
}
