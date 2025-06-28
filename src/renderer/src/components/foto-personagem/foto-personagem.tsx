import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import styles from './foto-personagem.module.scss'
import { JSX } from 'react'
import { useDispatch } from 'react-redux'
import { abrirModal } from '@renderer/store/slices/modalSlice'

type FotoPersonagemProps = {
  personagem: IPersonagem
}

export const FotoPersonagem = ({ personagem }: FotoPersonagemProps): JSX.Element => {
  const dispatch = useDispatch()

  return (
    <div
      onClick={() => dispatch(abrirModal('DETALHES_EDICAO_MODAL'))}
      className={styles.fotoPersonagem}
    >
      <img src="./character.png" alt={personagem.nome} />
      <span className={styles.opacidade}></span>
      <div className={styles.detalhes}>
        <div className={styles.detalhe}>
          <img src={`./icons/${personagem.raca}.svg`} alt={personagem.raca} />
          <p className="tormenta20Font">{personagem.raca}</p>
        </div>
        <div className={styles.detalhe}>
          <img src={`./icons/${personagem.classeInicial}.svg`} alt="Classe" />
          <p className="tormenta20Font">{personagem.classeInicial}</p>
        </div>
        <div className={styles.detalhe}>
          <img src={`./icons/tanna-toh.svg`} alt={personagem.origem} />
          <p className="tormenta20Font">{personagem.origem}</p>
        </div>
        <div className={styles.detalhe}>
          <img
            src={`./icons/${personagem.divindade.toLowerCase()}.svg`}
            alt={personagem.divindade}
          />
          <p className="tormenta20Font">{personagem.divindade}</p>
        </div>
      </div>
    </div>
  )
}
