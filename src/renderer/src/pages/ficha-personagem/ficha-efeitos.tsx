import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { JSX } from 'react'
import styles from './ficha-personagem.module.scss'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { CardModificador } from '@renderer/components/card-modificador/card-modificador'

type FichaEfeitosProps = {
  personagem: IPersonagem
}

export const FichaEfeitos = ({ personagem }: FichaEfeitosProps): JSX.Element => {
  return (
    <div className={styles.secaoEfeitos}>
      <SecaoFicha header={<h2 className="tormenta20Font">Efeitos</h2>} css="efeitos">
        {personagem.modificadores.map((mod) => (
          <CardModificador key={mod.id} modificador={mod} />
        ))}
      </SecaoFicha>
    </div>
  )
}
