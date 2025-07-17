import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import styles from './ficha-personagem.module.scss'
import { JSX } from 'react'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import { CardEfeito } from '@renderer/components/card-efeito/card-efeito'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { useCriarEfeito } from '@renderer/hooks/mutations/useEfeitoMutation'

type FichaEfeitosProps = {
  personagem: IPersonagem
}

export const FichaEfeitos = ({ personagem }: FichaEfeitosProps): JSX.Element => {
  const adicionarEfeito = useCriarEfeito()

  return (
    <div className={styles.secao}>
      <SecaoFicha
        header={
          <>
            <h2 className="tormenta20Font">Efeitos</h2>
            <BotaoModular
              css="botaoAcompanhanteHeader"
              font="inter"
              cor="transparente"
              onClickEvent={() =>
                adicionarEfeito.mutate({
                  efeito: {
                    nome: 'Novo efeito',
                    estaAtivo: false
                  },
                  idPersonagem: personagem.id
                })
              }
            >
              <img src="./icons/adicao.svg" alt="Adicionar efeito" />
              <p className="tormenta20Font">Adicionar</p>
            </BotaoModular>
          </>
        }
        css="efeitos"
      >
        {personagem.efeitos.map((efeito) => (
          <CardEfeito key={efeito.id} efeito={efeito} />
        ))}
      </SecaoFicha>
    </div>
  )
}
