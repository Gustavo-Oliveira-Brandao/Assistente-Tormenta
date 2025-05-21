import classNames from 'classnames'
import { JSX } from 'react'
import styles from './botao-modular.module.scss'

type BotaoModularProps = {
  icone?: string
  css: string
  cor?: string
  font?: string
  texto?: string | number
  onClickEvent: () => void
}

export const BotaoModular = ({
  icone,
  css,
  texto,
  onClickEvent,
  font,
  cor
}: BotaoModularProps): JSX.Element => {
  const btnClass = classNames(styles[css], font, {
    [styles[cor ?? '']]: cor != null
  })

  return (
    <button type="button" onClick={onClickEvent} className={btnClass}>
      {icone && <img src={icone} alt={String(texto)} />}
      {texto != null && <p>{texto}</p>}
    </button>
  )
}
