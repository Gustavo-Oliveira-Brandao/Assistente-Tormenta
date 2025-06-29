import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { JSX } from 'react'
import styles from './pericia.module.scss'
import { BotaoModular } from '../botao-modular/botao-modular'
import { SimpleCard } from '../simple-card/simple-card'

type periciaProps = {
  pericia: IPericia
  exibeTreinamento: boolean
  editavel: boolean
}

export const Pericia = ({ pericia, exibeTreinamento, editavel }: periciaProps): JSX.Element => {
  return (
    <>
      <SimpleCard width="100%" height="40px" css="littleCard">
        <BotaoModular
          css="botaoTimido"
          cor="transparente"
          font="tormenta20Font"
          texto={pericia.nome}
          onClickEvent={() => 'dispatch(abrirModal(`PERICIA_${pericia.nome}_MODAL`))'}
        />
        <div className={styles.rolagem}>
          {exibeTreinamento && (
            <p className={styles.treinamento + ' tormenta20Font'}>{pericia.treinamento}</p>
          )}
          <BotaoModular
            css="rollBtn"
            icone="./icons/d20 cinza.svg"
            onClickEvent={() => console.log('teste')}
            texto={pericia.valorAtual}
            font="tormenta20Font"
            cor="transparente"
          />
        </div>
      </SimpleCard>
    </>
  )
}
