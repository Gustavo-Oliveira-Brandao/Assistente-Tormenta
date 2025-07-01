import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { JSX } from 'react'
import styles from './pericia.module.scss'
import { SimpleCard } from '../simple-card/simple-card'
import { BotaoModular } from '../botao-modular/botao-modular'

type periciaProps = {
  pericia: IPericia
  exibeTreinamento: boolean
}

export const Pericia = ({ pericia, exibeTreinamento }: periciaProps): JSX.Element => {
  return (
    <>
      <SimpleCard width="100%" height="40px" css="littleCard">
        <BotaoModular css="botaoTimido" cor="transparente" font="tormenta20Font">
          <p>{pericia.nome}</p>
        </BotaoModular>
        <div className={styles.rolagem}>
          {exibeTreinamento && (
            <p className={styles.treinamento + ' tormenta20Font'}>{pericia.treinamento}</p>
          )}
          <BotaoModular css="rollBtn" font="tormenta20Font" cor="transparente">
            <img src="./icons/d20 cinza.svg" alt="rolagem" />
            <p>{pericia.valorAtual}</p>
          </BotaoModular>
        </div>
      </SimpleCard>
    </>
  )
}
