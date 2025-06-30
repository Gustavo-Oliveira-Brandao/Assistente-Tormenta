import { CardMagia } from '@renderer/components/card-magia/card-magia'
import { useDeletarMagia } from '@renderer/hooks/mutations/useMagiaMutation'
import { useExibirMagiasDefault } from '@renderer/hooks/selectors/useMagiaQuery'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { JSX } from 'react'
import styles from './ficha-personagem.module.scss'
import { DisclosureGroup } from 'react-aria-components'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'

export const FichaMagias = (): JSX.Element => {
  const { data: magiasDefault } = useExibirMagiasDefault()
  const removerMagia = useDeletarMagia()

  return (
    <div className={styles.secaoMagias}>
      <SecaoFicha
        header={
          <>
            <h2 className="tormenta20Font">Magias</h2>
            <BotaoModular css="botaoAcompanhanteHeader" cor="transparente" font="tormenta20Font">
              <img src="./icons/busca.svg" alt="Buscar magias" />
              <p>Buscar magias</p>
            </BotaoModular>
          </>
        }
        css="poderes"
      >
        <DisclosureGroup allowsMultipleExpanded>
          {magiasDefault &&
            magiasDefault.map((magia, index) => (
              <CardMagia
                key={index}
                magia={magia}
                iconeBotaoInteracao="./icons/delete.svg"
                onInteract={() => removerMagia.mutate(1)}
              />
            ))}
        </DisclosureGroup>
      </SecaoFicha>
    </div>
  )
}
