import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { CardMagia } from '@renderer/components/card-magia/card-magia'
import { useDeletarMagia } from '@renderer/hooks/mutations/useMagiaMutation'
import { useExibirMagiasDefault } from '@renderer/hooks/selectors/useMagiaQuery'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { JSX } from 'react'
import styles from './ficha-personagem.module.scss'
import { Accordion } from '@base-ui-components/react'

export const FichaMagias = (): JSX.Element => {
  const { data: magiasDefault } = useExibirMagiasDefault()
  const removerMagia = useDeletarMagia()

  return (
    <div className={styles.secaoMagias}>
      <SecaoFicha
        header={
          <>
            <h2 className="tormenta20Font">Magias</h2>
            <BotaoModular
              css="botaoAcompanhanteHeader"
              texto="Buscar magias"
              cor="transparente"
              font="tormenta20Font"
              onClickEvent={() => 'dispatch(abrirModal(`MAGIAS_LOJA_MODAL`))'}
              icone="./icons/busca.svg"
            />
          </>
        }
        css="poderes"
      >
        <Accordion.Root>
          {magiasDefault &&
            magiasDefault.map((magia, index) => (
              <CardMagia
                key={index}
                magia={magia}
                iconeBotaoInteracao="./icons/delete.svg"
                onInteract={() => removerMagia.mutate(1)}
              />
            ))}
        </Accordion.Root>
      </SecaoFicha>
    </div>
  )
}
