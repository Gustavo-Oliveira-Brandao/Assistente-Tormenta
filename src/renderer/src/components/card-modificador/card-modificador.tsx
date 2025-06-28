import { IModificador } from '@renderer/@types/T20 GOTY/IModificador'
import styles from '@renderer/assets/styles/cards.module.scss'
import { JSX } from 'react'
import { SimpleCard } from '../simple-card/simple-card'
import { FormSwitchModular } from '../switch-modular/switch-modular'
import { BotaoModular } from '../botao-modular/botao-modular'

type CardModificadorProps = {
  modificador: IModificador
}

export const CardModificador = ({ modificador }: CardModificadorProps): JSX.Element => {
  return (
    <SimpleCard css="efeito" width="100%" height="55px">
      <div className={styles.modificador}>
        <div className={styles.nomeEfeito}>
          <FormSwitchModular name="estaAtivo" label="Ativo:" />
          <p className="tormenta20Font">{modificador.nome}</p>
        </div>
        <div className={styles.valor}>
          <p className="tormenta20Font">{modificador.valor}</p>
        </div>
        <div className={styles.tipo}>
          <p className="tormenta20Font">{modificador.tipo}</p>
        </div>
        <div className={styles.alvo}>
          <p className="tormenta20Font">{modificador.alvo}</p>
        </div>
        <BotaoModular
          css="botaoAcaoPequeno"
          icone="./icons/delete.svg"
          cor="cinzaEscuro03"
          onClickEvent={() => console.log('sla')}
        />
      </div>
    </SimpleCard>
  )
}
