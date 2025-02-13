import { useExibirTodosPersonagensQuery } from '@renderer/hooks/useExbirTodosPersonagensQuery'
import styles from './tela-selecao-personagem.module.scss'
import BotaoModular from '@renderer/components/botao-modular/botao-modular'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useCriarPersonagemMutation } from '@renderer/hooks/useCriarPersonagemMutation'

const TelaSelecaoPersonagem = ({
  setPersonagemSelecionado
}: {
  setPersonagemSelecionado: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const { data: personagens } = useExibirTodosPersonagensQuery()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const criarPersonagemMutation = useCriarPersonagemMutation(queryClient)

  const selecionarPersonagem = (id: number): void => {
    setPersonagemSelecionado(id)
    navigate('/personagem')
  }

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
          onClickEvent={() => criarPersonagemMutation.mutate()}
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
