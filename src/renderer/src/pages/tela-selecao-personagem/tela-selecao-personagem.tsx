import { zodResolver } from '@hookform/resolvers/zod'
import styles from './tela-selecao-personagem.module.scss'
import BotaoModular from '@renderer/components/botao-modular/botao-modular'
import { useCriarPersonagemMutation } from '@renderer/hooks/mutations/personagem/useCriarPersonagemMutation'
import { useExibirTodosPersonagensQuery } from '@renderer/hooks/queries/personagem/useExibirTodosPersonagensQuery'
import Modal from '@renderer/templates/modal/modal'
import { personagemSchema } from '@renderer/validators/schemas/personagemSchema'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { exibirAtributosDefault } from '@renderer/api/atributo/exibirAtributosDefault'
import { exibirPericiasDefault } from '@renderer/api/pericia/exibirPericiasDefault'
import FormGroup from '@renderer/components/form-group/form-group'
import { opcoesRacas } from '@renderer/forms/select options/opcoesRacas'
import { opcoesClasses } from '@renderer/forms/select options/opcoesClasses'
import { opcoesTamanhos } from '@renderer/forms/select options/opcoesTamanhos'
import { opcoesDivindades } from '@renderer/forms/select options/opcoesDivindades'
import { opcoesTiposCriaturas } from '@renderer/forms/select options/opcoesTiposCriaturas'

const TelaSelecaoPersonagem = ({
  setPersonagemSelecionado
}: {
  setPersonagemSelecionado: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const { data: personagens } = useExibirTodosPersonagensQuery()
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  const selecionarPersonagem = (id: number): void => {
    setPersonagemSelecionado(id)
    navigate('/personagem')
  }

  const methods = useForm<z.infer<typeof personagemSchema>>({
    resolver: zodResolver(personagemSchema),
    defaultValues: {
      divindade: 'nenhuma',
      tipoCriatura: 'humanoide',
      tamanho: 'medio'
    }
  })

  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const criarPersonagem = useCriarPersonagemMutation()

  const onSubmit: SubmitHandler<z.infer<typeof personagemSchema>> = async (data): Promise<void> => {
    const atributosDefault = await exibirAtributosDefault()
    const periciasDefault = await exibirPericiasDefault()

    const novoPersonagem = {
      nome: data.nome,
      tipoCriatura: data.tipoCriatura,
      categoria: 'pj',
      raca: data.raca,
      classe: data.classe,
      origem: data.origem,
      divindade: data.divindade,
      nivel: 1,
      experiencia: 0,
      tamanho: data.tamanho,
      alinhamento: data.alinhamento,
      defesa: {
        armadura: 0,
        escudo: 0,
        temporario: 0,
        atributo: 'destreza',
        penalidadeArmaduraTotal: 0,
        bonus: []
      },
      vida: {
        valorAtual: 1,
        valorTemporario: 0,
        atributo: 'constituicao',
        bonus: []
      },
      mana: {
        valorAtual: 1,
        valorTemporario: 0,
        atributo: 'nenhum',
        bonus: [],
        limitePM: 0
      },
      deslocamento: {
        caminhada: 0,
        escalada: 0,
        natacao: 0,
        voo: 0,
        escavacao: 0
      },
      atributos: atributosDefault,
      pericias: periciasDefault,
      poderes: []
    }

    criarPersonagem.mutate(novoPersonagem)
    setModal(false)
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
          onClickEvent={() => setModal(true)}
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
      {modal &&
        createPortal(
          <Modal
            titulo="Criação de personagem"
            onClose={() => setModal(false)}
            height="fit-content"
          >
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <legend>Detalhes do personagem</legend>
                  <div className="d-flex">
                    <FormGroup name="nome" label="nome:" placeholder="Ragnar" type="text" />
                    <FormGroup
                      name="tipoCriatura"
                      label="tipo de criatura:"
                      options={opcoesTiposCriaturas}
                      type="dropdown"
                    />
                    <FormGroup name="raca" label="Raça:" type="dropdown" options={opcoesRacas} />
                    <FormGroup
                      name="classe"
                      label="Classe:"
                      type="dropdown"
                      options={opcoesClasses}
                    />
                    <FormGroup name="origem" label="origem:" type="text" placeholder="taverneiro" />
                    <FormGroup
                      name="divindade"
                      label="divindade:"
                      type="dropdown"
                      options={opcoesDivindades}
                    />
                    <FormGroup
                      name="tamanho"
                      label="tamanho:"
                      type="dropdown"
                      options={opcoesTamanhos}
                    />
                    <FormGroup
                      name="alinhamento"
                      label="alinhamento:"
                      type="text"
                      placeholder="Neutro e bom"
                    />
                  </div>
                </fieldset>
                {Object.entries(errors).map(([field, error]) => (
                  <p role="alert" key={field}>
                    {error.message}!
                  </p>
                ))}
                <input type="submit" value="Criar personagem" />
              </form>
            </FormProvider>
          </Modal>,
          document.body
        )}
    </div>
  )
}

export default TelaSelecaoPersonagem
