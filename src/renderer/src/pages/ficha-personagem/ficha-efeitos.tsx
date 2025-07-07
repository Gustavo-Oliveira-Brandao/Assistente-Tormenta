import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import styles from './ficha-personagem.module.scss'
import { JSX } from 'react'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { CardEfeito } from '@renderer/components/card-efeito/card-efeito'

type FichaEfeitosProps = {
  personagem: IPersonagem
}

export const FichaEfeitos = ({ personagem }: FichaEfeitosProps): JSX.Element => {
  return (
    <div className={styles.secao}>
      <SecaoFicha header={<h2 className="tormenta20Font">Efeitos</h2>} css="efeitos">
        {personagem.efeitos.map((efeito) => (
          <CardEfeito key={efeito.id} efeito={efeito} />
        ))}
      </SecaoFicha>
    </div>
  )
}
