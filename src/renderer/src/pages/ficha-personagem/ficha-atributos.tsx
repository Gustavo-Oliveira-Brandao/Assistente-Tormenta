import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { Pericia } from '@renderer/components/pericia/pericia'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { JSX } from 'react'
import styles from './ficha-personagem.module.scss'
import { Atributo } from '@renderer/components/atributo/atributo'

type FichaAtributosProps = {
  personagem: IPersonagem
}

export const FichaAtributos = ({ personagem }: FichaAtributosProps): JSX.Element => {
  return (
    <div className={styles.secao}>
      <SecaoFicha header={<h2 className="tormenta20Font">Atributos</h2>} css="atributos">
        {personagem.atributos
          .sort((a, b) => a.ordem - b.ordem)
          .map((atributo) => (
            <Atributo key={atributo.id} atributo={atributo} />
          ))}
      </SecaoFicha>
      <div className={styles.partePericias}>
        <div className={styles.combate}>
          <SecaoFicha
            header={<h2 className="tormenta20Font">Pericias de combate</h2>}
            css="ColumnPericias"
          >
            {personagem.pericias
              .filter((pericia) => pericia.categoria === 'combate')
              .map((pericia) => (
                <Pericia css="combate" key={pericia.id} pericia={pericia} exibeTreinamento={true} />
              ))}
          </SecaoFicha>
          <SecaoFicha
            header={<h2 className="tormenta20Font">Testes de resistência</h2>}
            css="ColumnPericias"
          >
            {personagem.pericias
              .filter((pericia) => pericia.categoria === 'testeResistencia')
              .map((pericia) => (
                <Pericia css="combate" key={pericia.id} pericia={pericia} exibeTreinamento={true} />
              ))}
          </SecaoFicha>
        </div>
        <div className={styles.gerais}>
          <SecaoFicha
            header={<h2 className="tormenta20Font">Pericias gerais</h2>}
            css="gridPericias"
          >
            {personagem.pericias
              .filter((pericia) => pericia.categoria === 'geral')
              .map((pericia) => (
                <Pericia css="geral" key={pericia.id} pericia={pericia} exibeTreinamento={true} />
              ))}
          </SecaoFicha>
        </div>
        <SecaoFicha header={<h2 className="tormenta20Font">Oficio</h2>} css="pericias">
          {personagem.pericias
            .filter((pericia) => pericia.categoria === 'oficio')
            .map((pericia) => (
              <Pericia css="oficio" key={pericia.id} pericia={pericia} exibeTreinamento={true} />
            ))}
        </SecaoFicha>
      </div>
    </div>
  )
}
