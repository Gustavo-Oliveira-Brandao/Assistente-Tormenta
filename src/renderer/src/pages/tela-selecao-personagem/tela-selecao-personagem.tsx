import { useExibirTodosPersonagensQuery } from '@renderer/hooks/useExbirTodosPersonagensQuery'
import styles from './tela-selecao-personagem.module.scss'

const TelaSelecaoPersonagem = (): JSX.Element => {
  const { data: personagens } = useExibirTodosPersonagensQuery()

  return (
    <div className={styles.selecaoPersonagem}>
      {personagens &&
        personagens.map((personagem) => (
          <div key={personagem.id} className={styles.personagem}>
            <div className={styles.detalhes}>
              <h2>{personagem.nome}</h2>
              <div className={styles.subDetalhes}>
                <p>{personagem.raca}</p>
                <p>{personagem.classe}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default TelaSelecaoPersonagem
