import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { Pericia } from '@renderer/components/pericia/pericia'
import { JSX } from 'react'
import styles from './ficha-personagem.module.scss'
import { Atributo } from '@renderer/components/atributo/atributo'

type FichaAtributosProps = {
  personagem: IPersonagem
}

export const FichaAtributos = ({ personagem }: FichaAtributosProps): JSX.Element => {
  return (
    <div className={styles.secao}>
      <div className={styles.atributos}>
        {personagem.atributos.map((atributo) => (
          <Atributo key={atributo.id} atributo={atributo} />
        ))}
      </div>
      <div className={styles.pericias}>
        <div className={styles.gerais}>
          <div className={styles.secaoTemplate}>
            <div className={styles.header}>
              <h2 className="tormenta20Font">Pericias</h2>
            </div>
            <div className={styles.conteudoSecao}>
              {personagem.pericias
                .filter((pericia) => pericia.categoria === 'geral')
                .map((pericia) => (
                  <Pericia key={pericia.id} pericia={pericia} exibeTreinamento={true} />
                ))}
            </div>
          </div>
          <div className={styles.secaoTemplate}>
            <div className={styles.header}>
              <h2 className="tormenta20Font">Oficios</h2>
            </div>
            <div className={styles.conteudoSecao}>
              {personagem.pericias
                .filter((pericia) => pericia.categoria === 'oficio')
                .map((pericia) => (
                  <Pericia key={pericia.id} pericia={pericia} exibeTreinamento={true} />
                ))}
            </div>
          </div>
        </div>
        <div className={styles.outros}>
          <div className={styles.secaoTemplate}>
            <div className={styles.header}>
              <h2 className="tormenta20Font">Combate</h2>
            </div>
            <div className={styles.conteudoSecao}>
              {personagem.pericias
                .filter((pericia) => pericia.categoria === 'combate')
                .map((pericia) => (
                  <Pericia key={pericia.id} pericia={pericia} exibeTreinamento={true} />
                ))}
            </div>
          </div>
          <div className={styles.secaoTemplate}>
            <div className={styles.header}>
              <h2 className="tormenta20Font">Testes de resistência</h2>
            </div>
            <div className={styles.conteudoSecao}>
              {personagem.pericias
                .filter((pericia) => pericia.categoria === 'testeResistencia')
                .map((pericia) => (
                  <Pericia key={pericia.id} pericia={pericia} exibeTreinamento={true} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
