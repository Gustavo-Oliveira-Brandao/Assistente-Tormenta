import styles from './tela-selecao-personagem.module.scss'
import BotaoModular from '@renderer/components/botao-modular/botao-modular'
import { useCriarPersonagemMutation } from '@renderer/hooks/mutations/personagem/useCriarPersonagemMutation'
import { useExibirTodosPersonagensQuery } from '@renderer/hooks/queries/personagem/useExibirTodosPersonagensQuery'
import { useNavigate } from 'react-router-dom'

const TelaSelecaoPersonagem = ({
  setPersonagemSelecionado
}: {
  setPersonagemSelecionado: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const { data: personagens } = useExibirTodosPersonagensQuery()

  const navigate = useNavigate()

  const selecionarPersonagem = (id: number): void => {
    setPersonagemSelecionado(id)
    navigate('/personagem')
  }

  const criarPersonagem = useCriarPersonagemMutation()

  //TODO: Melhorar o visual do card de personagem para algo mais atrativo
  //TODO: Botao de voltar para a homepage
  //TODO: Melhorar o visual do botão de criar personagem
  return (
    <div className={styles.selecaoPersonagem}>
      <header>
        <h2>Selecione um personagem</h2>
        <BotaoModular
          icone="./icons/plus-solid.svg"
          texto="Criar personagem"
          css="botaoAdicionar"
          onClickEvent={() => criarPersonagem.mutate()}
        />
      </header>
      {personagens &&
        personagens.map((personagem) => (
          <div
            key={personagem.id}
            className={styles.personagem}
            onClick={() => selecionarPersonagem(personagem.id)}
          >
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
