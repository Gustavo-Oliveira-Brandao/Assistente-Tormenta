import styles from './botao-rolagem.module.scss'

const BotaoRolagem = ({ valor }: { valor: number }): JSX.Element => {
  return (
    <button className={styles.rollBtn}>
      <img src={'./icons/dados/d20.svg'} alt="Rolagem" />
      <p>{valor}</p>
    </button>
  )
}

export default BotaoRolagem
