import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { CardMagia } from '@renderer/components/card-magia/card-magia'
import { useDeletarMagia } from '@renderer/hooks/mutations/useMagiaMutation'
import { useExibirMagiasDefault } from '@renderer/hooks/selectors/useMagiaQuery'
import { abrirModal } from '@renderer/store/slices/modalSlice'
import { RootState } from '@renderer/store/store'
import { Modal } from '@renderer/templates/modal/modal'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { JSX } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ficha-personagem.module.scss'

type FichaMagiasProps = {}

export const FichaMagias = (): JSX.Element => {
  const { data: magiasDefault } = useExibirMagiasDefault()
  const removerMagia = useDeletarMagia()
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)
  return (
    <div className={styles.secaoMagias}>
      <SecaoFicha
        header={
          <>
            <h2 className="tormenta20Font">Magias</h2>
            <BotaoModular
              css="minimalista"
              texto="Buscar magias"
              cor="transparente"
              font="tormenta20Font"
              onClickEvent={() => dispatch(abrirModal(`MAGIAS_LOJA_MODAL`))}
              icone="./icons/busca.svg"
            />
          </>
        }
        css="poderes"
      >
        {magiasDefault &&
          magiasDefault.map((magia, index) => (
            <CardMagia
              key={index}
              magia={magia}
              iconeBotaoInteracao="./icons/delete.svg"
              onInteract={() => removerMagia.mutate(magia.key)}
            />
          ))}
      </SecaoFicha>
      {modalAberto === 'MAGIAS_LOJA_MODAL' &&
        createPortal(
          <Modal titulo="Adicionar magias" height="400px" width="550px">
            {magiasDefault &&
              magiasDefault.map((magia, index) => (
                <CardMagia
                  key={index}
                  magia={magia}
                  iconeBotaoInteracao="./icons/adicao.svg"
                  onInteract={() => removerMagia.mutate(magia.key)}
                />
              ))}
          </Modal>,
          document.body
        )}
    </div>
  )
}
