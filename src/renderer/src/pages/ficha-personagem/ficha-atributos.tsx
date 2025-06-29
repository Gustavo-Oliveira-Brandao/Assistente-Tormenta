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
    <div className={styles.secaoAtributos}>
      <SecaoFicha header={<h2 className="tormenta20Font">Atributos</h2>} css="atributos">
        {personagem.atributos
          .sort((a, b) => a.ordem - b.ordem)
          .map((atributo) => (
            <Atributo key={atributo.id} atributo={atributo} />
          ))}
      </SecaoFicha>
      <SecaoFicha header={<h2 className="tormenta20Font">Pericias de combate</h2>} css="pericias">
        {personagem.pericias
          .filter((pericia) => pericia.categoria === 'combate')
          .map((pericia) => (
            <Pericia key={pericia.id} pericia={pericia} exibeTreinamento={true} editavel={true} />
          ))}
      </SecaoFicha>
      <SecaoFicha header={<h2 className="tormenta20Font">Testes de resistência</h2>} css="pericias">
        {personagem.pericias
          .filter((pericia) => pericia.categoria === 'testeResistencia')
          .map((pericia) => (
            <Pericia key={pericia.id} pericia={pericia} exibeTreinamento={true} editavel={true} />
          ))}
      </SecaoFicha>
      <SecaoFicha header={<h2 className="tormenta20Font">Pericias gerais</h2>} css="pericias">
        {personagem.pericias
          .filter((pericia) => pericia.categoria === 'geral')
          .map((pericia) => (
            <Pericia key={pericia.id} pericia={pericia} exibeTreinamento={true} editavel={true} />
          ))}
      </SecaoFicha>
    </div>
  )
}
