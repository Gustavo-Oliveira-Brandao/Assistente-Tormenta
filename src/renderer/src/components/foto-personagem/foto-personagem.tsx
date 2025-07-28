import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import styles from './foto-personagem.module.scss'
import { JSX } from 'react'

type FotoPersonagemProps = {
  personagem: IPersonagem
}

export const FotoPersonagem = ({ personagem }: FotoPersonagemProps): JSX.Element => {
  return (
    <div onClick={() => console.log('sla')} className={styles.fotoPersonagem}>
      <img src="./character.png" alt={personagem.nome} />
      <span className={styles.opacidade}></span>
    </div>
  )
}
