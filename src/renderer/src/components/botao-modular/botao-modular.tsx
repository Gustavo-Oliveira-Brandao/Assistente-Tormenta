import classNames from 'classnames'
import styles from './botao-modular.module.scss'

interface BotaoModularProps {
  icone?: string
  css: string
  texto?: string | number
  onClickEvent: () => void
  estaAtivo?: boolean
}

const BotaoModular = ({
  icone,
  css,
  texto,
  onClickEvent,
  estaAtivo
}: BotaoModularProps): JSX.Element => {
  const btnClass = classNames(styles[css], {
    [styles.ativo]: estaAtivo
  })

  return (
    <button type="button" onClick={onClickEvent} className={btnClass}>
      {icone && <img src={icone} alt={String(texto)} />}
      {texto != null && <p>{texto}</p>}
    </button>
  )
}

export default BotaoModular
