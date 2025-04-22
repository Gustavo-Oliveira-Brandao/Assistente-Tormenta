import { zodResolver } from '@hookform/resolvers/zod'
import { exibirAtributosDefault } from '@renderer/api/atributo/exibirAtributosDefault'
import { exibirPericiasDefault } from '@renderer/api/pericia/exibirPericiasDefault'
import { opcoesClasses } from '@renderer/utils/select options/opcoesClasses'
import { opcoesDivindades } from '@renderer/utils/select options/opcoesDivindades'
import { opcoesRacas } from '@renderer/utils/select options/opcoesRacas'
import { opcoesTamanhos } from '@renderer/utils/select options/opcoesTamanhos'
import { opcoesTiposCriaturas } from '@renderer/utils/select options/opcoesTiposCriaturas'
import { useCriarPersonagemMutation } from '@renderer/hooks/mutations/personagem/useCriarPersonagemMutation'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { personagemSchema } from '@renderer/validators/schemas/personagemSchema'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import FormGroup from '../form-group/form-group'

export const PersonagemForm = (): JSX.Element => {
  const dispatch = useDispatch()

  const methods = useForm<z.infer<typeof personagemSchema>>({
    resolver: zodResolver(personagemSchema),
    defaultValues: {
      divindade: 'nenhuma',
      tipoCriatura: 'humanoide',
      tamanho: 'medio',
      nivel: 1,
      experiencia: 0
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
      recursos: [
        {
          categoria: 'vida',
          valorAtual: 1,
          valorTemporario: 0,
          atributo: 'constituicao',
          bonus: []
        },
        {
          categoria: 'mana',
          valorAtual: 1,
          valorTemporario: 0,
          atributo: 'nenhum',
          bonus: []
        },
        {
          categoria: 'deslocamento',
          valorAtual: 1,
          valorTemporario: 0,
          atributo: 'nenhum',
          bonus: []
        },
        {
          categoria: 'defesa',
          valorAtual: 1,
          valorTemporario: 0,
          atributo: 'destreza',
          bonus: []
        }
      ],
      atributos: atributosDefault,
      pericias: periciasDefault
    }

    criarPersonagem.mutate(novoPersonagem)
    dispatch(abrirModal('PERSONAGEM_SELECAO_MODAL'))
  }
  return (
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
            <FormGroup name="classe" label="Classe:" type="dropdown" options={opcoesClasses} />
            <FormGroup name="origem" label="origem:" type="text" placeholder="taverneiro" />
            <FormGroup
              name="divindade"
              label="divindade:"
              type="dropdown"
              options={opcoesDivindades}
            />
            <FormGroup name="tamanho" label="tamanho:" type="dropdown" options={opcoesTamanhos} />
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
  )
}
