import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import styles from './foto-personagem.module.scss'
import { JSX } from 'react'

type FotoPersonagemProps = {
  personagem: IPersonagem
}

export const FotoPersonagem = ({ personagem }: FotoPersonagemProps): JSX.Element => {
  return (
    <div className={styles.fotoPersonagem}>
      <img className={styles.foto} src="./character.png" alt={personagem.nome} />
      <div className={`${styles.nivel}`}>
        <img src="./icons/nivel.webp" alt="Nivel" />
        <p className="inter">{personagem.nivel}</p>
      </div>
    </div>
  )
}
