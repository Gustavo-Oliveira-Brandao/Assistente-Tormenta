import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import styles from './ficha-personagem.module.scss'
import btnStyles from '@renderer/assets/styles/botoes.module.scss'
import { JSX } from 'react'
import { CardEfeito } from '@renderer/components/card-efeito/card-efeito'
import { useCriarEfeito } from '@renderer/hooks/mutations/useEfeitoMutation'
import { Button } from 'react-aria-components'

type FichaEfeitosProps = {
  personagem: IPersonagem
}

export const FichaEfeitos = ({ personagem }: FichaEfeitosProps): JSX.Element => {
  const adicionarEfeito = useCriarEfeito()

  return (
    <div className={styles.secao}>
      <div className={styles.secaoTemplate}>
        <div className={styles.multiHeader}>
          <h2 className="tormenta20Font">Efeitos</h2>
          <Button
            className={`${btnStyles.botaoAcompanhanteHeader} inter`}
            onPress={() =>
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
          </Button>
        </div>

        {personagem.efeitos.map((efeito) => (
          <CardEfeito key={efeito.id} efeito={efeito} />
        ))}
      </div>
    </div>
  )
}
