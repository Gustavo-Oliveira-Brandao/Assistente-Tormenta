import { Pericia } from '@renderer/@types/t20/Pericia'
import styles from './card-pericia.module.scss'
import { useState } from 'react'
import BotaoRolagem from '../botao-rolagem/botao-rolagem'

const CardPericia = ({ pericia, css }: { pericia: Pericia; css: string }): JSX.Element => {
  const [treinamento, setTreinamento] = useState('Destreinado')
  if (pericia.ehTreinado) {
    setTreinamento('Treinado')
  }

  return (
    <div className={`${styles[css]} ${styles.padrao}`}>
      <button className={styles.titulo}>
        <p className={styles.nome}>{pericia.nome}</p>
      </button>
      <div className={styles.rolagem}>
        {css !== 'sidebar' && <p className={styles.treinamento}>{treinamento}</p>}
        <BotaoRolagem valor={pericia.valorAtual} />
      </div>
    </div>
  )
}

export default CardPericia
