import { CardMagia } from '@renderer/components/card-magia/card-magia'
import { useCriarMagia, useDeletarMagia } from '@renderer/hooks/mutations/useMagiaMutation'
import { JSX, useMemo, useState } from 'react'
import btnStyles from '@renderer/assets/styles/botoes.module.scss'
import styles from './ficha-personagem.module.scss'
import { Button, DialogTrigger, DisclosureGroup } from 'react-aria-components'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { ModalModular } from '@renderer/components/modal/modal'
import { OptionModular, StandaloneSelect } from '@renderer/components/select-field/select-field'
import { escolasMagiasData, tradicoesMagiasData } from '@renderer/utils/common data/magiasData'
import { useExibirCompendio } from '@renderer/hooks/selectors/useCompendioQuery'
import { useExibirMagiasPersonagem } from '@renderer/hooks/selectors/useMagiaQuery'
import { IMagia } from '@renderer/@types/T20 GOTY/IMagia'
import { DeepPartial } from '@renderer/@types/DeepPartial'

type FichaMagiasProps = {
  personagem: IPersonagem
}

export const FichaMagias = ({ personagem }: FichaMagiasProps): JSX.Element => {
  const { data: compendio } = useExibirCompendio()
  const adicionarMagia = useCriarMagia()
  const { data: grimorio } = useExibirMagiasPersonagem(personagem.id)
  const removerMagia = useDeletarMagia()
  const [lojaEstaAberta, setLojaEstaAberta] = useState(false)

  const [filtroEscola, setFiltroEscola] = useState('TODAS')
  const [filtroTradicao, setFiltroTradicao] = useState('TODAS')
  const [filtroNivel, setFiltroNivel] = useState(1)

  const magiasFiltradas = useMemo(() => {
    return compendio?.magias?.filter(
      (magia) =>
        (magia.escola?.toLowerCase() == filtroEscola.toLowerCase() || filtroEscola == 'TODAS') &&
        (magia.tradicao?.toLowerCase() == filtroTradicao.toLowerCase() ||
          filtroTradicao == 'TODAS') &&
        magia.nivelCirculo == filtroNivel
    )
  }, [compendio, filtroEscola, filtroTradicao, filtroNivel])

  const submitMagia = (magia: DeepPartial<IMagia>): void => {
    if (grimorio) {
      adicionarMagia.mutate({ magia: magia, idGrimorio: grimorio.id })
    }
    setLojaEstaAberta(false)
  }

  return (
    <div className={styles.secao}>
      <div className={styles.secaoTemplate}>
        <div className={styles.multiHeader}>
          <h2 className="tormenta20Font">1º circulo</h2>
        </div>
        <div className={styles.conteudoSecao}>
          <DisclosureGroup allowsMultipleExpanded>
            {grimorio &&
              grimorio.magias
                .filter((magia) => magia.nivelCirculo == 1)
                .map((magia) => (
                  <CardMagia
                    key={magia.id}
                    magia={magia}
                    iconeBotaoInteracao="./icons/delete.svg"
                    onInteract={() => removerMagia.mutate(magia.id)}
                  />
                ))}
          </DisclosureGroup>
        </div>
      </div>
      <div className={styles.secaoTemplate}>
        <div className={styles.multiHeader}>
          <h2 className="tormenta20Font">2º circulo</h2>
        </div>
        <div className={styles.conteudoSecao}>
          <DisclosureGroup allowsMultipleExpanded>
            {grimorio &&
              grimorio.magias
                .filter((magia) => magia.nivelCirculo == 2)
                .map((magia) => (
                  <CardMagia
                    key={magia.id}
                    magia={magia}
                    iconeBotaoInteracao="./icons/delete.svg"
                    onInteract={() => removerMagia.mutate(magia.id)}
                  />
                ))}
          </DisclosureGroup>
        </div>
      </div>
      <div className={styles.secaoTemplate}>
        <div className={styles.multiHeader}>
          <h2 className="tormenta20Font">3º circulo</h2>
        </div>
        <div className={styles.conteudoSecao}>
          <DisclosureGroup allowsMultipleExpanded>
            {grimorio &&
              grimorio.magias
                .filter((magia) => magia.nivelCirculo == 3)
                .map((magia) => (
                  <CardMagia
                    key={magia.id}
                    magia={magia}
                    iconeBotaoInteracao="./icons/delete.svg"
                    onInteract={() => removerMagia.mutate(magia.id)}
                  />
                ))}
          </DisclosureGroup>
        </div>
      </div>
      <div className={styles.secaoTemplate}>
        <div className={styles.multiHeader}>
          <h2 className="tormenta20Font">4º circulo</h2>
        </div>
        <div className={styles.conteudoSecao}>
          <DisclosureGroup allowsMultipleExpanded>
            {grimorio &&
              grimorio.magias
                .filter((magia) => magia.nivelCirculo == 4)
                .map((magia) => (
                  <CardMagia
                    key={magia.id}
                    magia={magia}
                    iconeBotaoInteracao="./icons/delete.svg"
                    onInteract={() => removerMagia.mutate(magia.id)}
                  />
                ))}
          </DisclosureGroup>
        </div>
      </div>
      <div className={styles.secaoTemplate}>
        <div className={styles.multiHeader}>
          <h2 className="tormenta20Font">5º circulo</h2>
        </div>
        <div className={styles.conteudoSecao}>
          <DisclosureGroup allowsMultipleExpanded>
            {grimorio &&
              grimorio.magias
                .filter((magia) => magia.nivelCirculo == 5)
                .map((magia) => (
                  <CardMagia
                    key={magia.id}
                    magia={magia}
                    iconeBotaoInteracao="./icons/delete.svg"
                    onInteract={() => removerMagia.mutate(magia.id)}
                  />
                ))}
          </DisclosureGroup>
        </div>
      </div>
      <DialogTrigger isOpen={lojaEstaAberta} onOpenChange={setLojaEstaAberta}>
        <ModalModular
          placement="center"
          height="90vh"
          width="750px"
          titulo="Compêndio de magias"
          overflow="auto"
          sidebar={
            <div className={styles.filtros}>
              <p className="tormenta20Font">Filtros</p>
              <StandaloneSelect
                onChange={setFiltroEscola}
                name="escolaMagias"
                label="Escola"
                selecao={filtroEscola}
              >
                <OptionModular value="Todas" name="TODAS" />
                {escolasMagiasData.map((opt) => (
                  <OptionModular key={opt} value={opt} name={opt} />
                ))}
              </StandaloneSelect>
              <StandaloneSelect
                onChange={setFiltroTradicao}
                name="tradicaoMagias"
                label="Tradição"
                selecao={filtroTradicao}
              >
                <OptionModular value="Todas" name="TODAS" />
                {tradicoesMagiasData.map((opt) => (
                  <OptionModular key={opt.value} value={opt.nome} name={opt.value} />
                ))}
              </StandaloneSelect>
            </div>
          }
        >
          <DisclosureGroup allowsMultipleExpanded>
            {magiasFiltradas?.map((magia) => (
              <CardMagia
                key={magia.key}
                magia={magia}
                onInteract={() => submitMagia(magia)}
                iconeBotaoInteracao="./icons/adicao.svg"
              />
            ))}
          </DisclosureGroup>
        </ModalModular>
      </DialogTrigger>
    </div>
  )
}
