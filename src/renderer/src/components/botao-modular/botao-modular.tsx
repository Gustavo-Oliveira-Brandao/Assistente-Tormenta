import classNames from 'classnames'
import styles from './botao-modular.module.scss'
const BotaoModular = ({
  icone,
  css,
  texto,
  onClickEvent,
  estaAtivo
}: {
  icone?: string
  css: string
  texto?: string | number
  onClickEvent: () => void
  estaAtivo?: boolean
}): JSX.Element => {
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
