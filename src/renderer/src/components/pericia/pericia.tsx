import { IPericia } from '@renderer/@types/T20 GOTY/IPericia'
import { JSX } from 'react'
import { useDispatch } from 'react-redux'
import styles from './pericia.module.scss'
import { abrirModal } from '@renderer/store/slices/modalSlice'
import { BotaoModular } from '../botao-modular/botao-modular'

type periciaProps = {
  pericia: IPericia
  exibeTreinamento: boolean
  height: string
  width: string
}

export const Pericia = ({
  pericia,
  exibeTreinamento,
  height,
  width
}: periciaProps): JSX.Element => {
  const dispatch = useDispatch()

  return (
    <>
      <div className={styles.pericia} style={{ width: width, height: height }}>
        <button
          className={styles.titulo}
          onClick={() => dispatch(abrirModal(`PERICIA_${pericia.nome}_EDICAO_MODAL`))}
        >
          <p className={styles.nome + ' tormenta20Font'}>{pericia.nome}</p>
        </button>
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
      </div>
    </>
  )
}
