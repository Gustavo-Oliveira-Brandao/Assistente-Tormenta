import { Atributo } from '@renderer/@types/t20/Atributo'
import styles from './card-atributo.module.scss'
import BotaoRolagem from '../botao-rolagem/botao-rolagem'

const CardAtributo = ({ atributo }: { atributo: Atributo }): JSX.Element => {
  return (
    <div className={styles.atributo}>
      <div className={styles.titulo}>
        <button>{atributo.nome}</button>
      </div>
      <BotaoRolagem valor={atributo.valorAtual} />
    </div>
  )
}

export default CardAtributo
