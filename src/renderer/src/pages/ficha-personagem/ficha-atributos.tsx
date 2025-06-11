import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { Pericia } from '@renderer/components/pericia/pericia'
import { abrirModal } from '@renderer/store/slices/modalSlice'
import { RootState } from '@renderer/store/store'
import { Modal } from '@renderer/templates/modal/modal'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { JSX } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ficha-personagem.module.scss'

type FichaAtributosProps = {
  personagem: IPersonagem
}

export const FichaAtributos = ({ personagem }: FichaAtributosProps): JSX.Element => {
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  return (
    <div className={styles.secaoAtributos}>
      <SecaoFicha header={<h2 className="tormenta20Font">Atributos</h2>} css="atributos">
        {personagem.atributos
          .sort((a, b) => a.ordem - b.ordem)
          .map((atributo) => (
            <div className={styles.atributo} key={atributo.id}>
              <div className={styles.titulo}>
                <BotaoModular
                  font="tormenta20Font"
                  onClickEvent={() =>
                    dispatch(abrirModal(`ATRIBUTO_${atributo.nome}_EDICAO_MODAL`))
                  }
                  texto={atributo.nome}
                  css="simples"
                  cor="transparente"
                />
              </div>
              <BotaoModular
                css="rollBtn"
                cor="transparente"
                icone="./icons/d20 cinza.svg"
                onClickEvent={() => console.log('teste')}
                font="tormenta20Font"
                texto={atributo.valorBase}
              />
              {modalAberto === `ATRIBUTO_${atributo.nome}_EDICAO_MODAL` &&
                createPortal(
                  <Modal titulo={atributo.nome} height="fit-content" width="400px">
                    <></>
                  </Modal>,
                  document.body
                )}
            </div>
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
