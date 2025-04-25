import { zodResolver } from '@hookform/resolvers/zod'
import { exibirAtributosDefault } from '@renderer/api/atributo/exibirAtributosDefault'
import { exibirPericiasDefault } from '@renderer/api/pericia/exibirPericiasDefault'
import { useCriarPersonagemMutation } from '@renderer/hooks/mutations/personagem/useCriarPersonagemMutation'
import { abrirModal } from '@renderer/store/slices/modalSlice'
import { personagemSchema } from '@renderer/validators/schemas/personagemSchema'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import FormGroup from '../form-group/form-group'
import { useMemo } from 'react'
import { useExibirListaRacas } from '@renderer/hooks/queries/raca/useExibirListaRacas'
import { useExibirListaClasses } from '@renderer/hooks/queries/classes/useExibirListaClasses'
import { useExibirLojaPoderesQuery } from '@renderer/hooks/queries/poder/useExibirLojaPoderesQuery'
import Card from '../generic-card/card'
import styles from '@renderer/assets/styles/forms.module.scss'
import CardPoder from '../card-poder/card-poder'
import { useExibirAtributosDefaultQuery } from '@renderer/hooks/queries/atributos/useExibirAtributosDefaultQuery'
import { IAtributo } from '@renderer/@types/t20/Atributo'
import Atributo from '../card-atributo/atributo'
import { calcularBonus } from '@renderer/utils/carregarPersonagem'

interface personagemFormProps {
  etapaFormulario: string
}

export const PersonagemForm = ({ etapaFormulario }: personagemFormProps): JSX.Element => {
  const { data: racas } = useExibirListaRacas()
  const { data: classes } = useExibirListaClasses()
  const { data: poderes } = useExibirLojaPoderesQuery()
  const { data: atributosDefault } = useExibirAtributosDefaultQuery()

  const dispatch = useDispatch()

  const methods = useForm<z.infer<typeof personagemSchema>>({
    resolver: zodResolver(personagemSchema),
    defaultValues: {
      raca: 'humano',
      classe: 'arcanista',
      nivel: 1,
      experiencia: 0,
      idade: 1,
      peso: '0kg',
      altura: '0m',
      forcaBase: 0,
      destrezaBase: 0,
      constituicaoBase: 0,
      sabedoriaBase: 0,
      inteligenciaBase: 0,
      carismaBase: 0
    }
  })

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = methods

  const [racaExibida, classeExibida] = useMemo(() => {
    const racaSelecionada = watch('raca')
    const classeSelecionada = watch('classe')

    const racaEncontrada = racas?.find((raca) => raca.nome === racaSelecionada)
    const classeEncontrada = classes?.find((classe) => classe.nome === classeSelecionada)

    return [racaEncontrada, classeEncontrada]
  }, [watch('raca'), watch('classe'), racas, classes])

  const atributosFinais = useMemo<Partial<IAtributo>[]>(() => {
    const atributosForm = [
      {
        atributo: 'forca',
        valor: watch('forcaBase')
      },
      {
        atributo: 'destreza',
        valor: watch('destrezaBase')
      },
      {
        atributo: 'constituicao',
        valor: watch('constituicaoBase')
      },
      {
        atributo: 'inteligencia',
        valor: watch('inteligenciaBase')
      },
      {
        atributo: 'sabedoria',
        valor: watch('sabedoriaBase')
      },
      {
        atributo: 'carisma',
        valor: watch('carismaBase')
      }
    ]

    const novosAtributos: Partial<IAtributo>[] = []

    if (atributosDefault) {
      atributosDefault.forEach((atributoDefault) => {
        const atributoData = atributosForm.find(
          (atributoForm) => atributoForm.atributo === atributoDefault.nome
        )
        if (atributoData) {
          const novoAtributo: Partial<IAtributo> = {
            nome: atributoDefault.nome,
            valor: atributoData.valor || 0,
            bonus: [],
            ordem: atributoDefault.ordem,
            valorAtual: 0
          }
          racaExibida?.atributos
            .filter((atributoRaca) => atributoRaca.atributo === atributoDefault.nome)
            .map((atributoRaca) => {
              if (novoAtributo.bonus) {
                novoAtributo.bonus.push({
                  label: racaExibida.nome,
                  valor: atributoRaca.valor,
                  estaAtivo: true,
                  ehPorNivel: false
                })
              }
            })
          let bonusAtributoTotal = 0
          if (novoAtributo.bonus) {
            bonusAtributoTotal = calcularBonus(novoAtributo.bonus, 1)
          }
          novoAtributo.valorAtual = novoAtributo.valor || 0 + bonusAtributoTotal
          novosAtributos.push(novoAtributo)
        }
      })
    }
    return novosAtributos
  }, [
    racaExibida,
    watch('forcaBase'),
    watch('destrezaBase'),
    watch('constituicaoBase'),
    watch('inteligenciaBase'),
    watch('sabedoriaBase'),
    watch('carismaBase')
  ])

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
      idade: data.idade,
      altura: data.altura,
      peso: data.peso,
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {etapaFormulario === 'bio' && (
          <fieldset className={styles.fieldset}>
            <legend>Detalhes do personagem</legend>
            <div className={styles.rowFields}>
              <FormGroup name="nome" label="nome:" placeholder="Ragnar" type="text" />
              <FormGroup name="idade" label="idade:" placeholder="0" type="number" />
              <FormGroup name="altura" label="altura:" placeholder="1,80m" type="text" />
              <FormGroup name="peso" label="peso:" placeholder="80kg" type="text" />
            </div>
          </fieldset>
        )}
        {etapaFormulario === 'raca' && (
          <div className={styles.doublePanel}>
            <ul className={styles.customSelect}>
              {racas &&
                racas.map((raca) => (
                  <li
                    key={raca.id}
                    onClick={() => setValue('raca', raca.nome, { shouldValidate: true })}
                    className={racaExibida?.nome === raca.nome ? styles.ativo : undefined}
                  >
                    <div>
                      <p>{raca.nome}</p>
                    </div>
                  </li>
                ))}
            </ul>
            <div className={styles.descriptionPanel}>
              {racaExibida && (
                <div className={styles.cards}>
                  <h2 className={styles.titulo}>{racaExibida.nome}</h2>
                  <Card titulo="Atributos" css="minimalista" inicialEstaExpandido={true}>
                    {racaExibida.atributos.map((atributo, index) => (
                      <p key={index} className="sourceSansPro">
                        {atributo.valor > 0 ? `+${atributo.valor}` : atributo.valor}{' '}
                        {atributo.atributo}
                      </p>
                    ))}
                  </Card>
                  <Card titulo="Tipo de criatura" css="minimalista" inicialEstaExpandido={true}>
                    <p className="sourceSansPro">{racaExibida.tipoCriatura}</p>
                  </Card>
                  <Card titulo="Tamanho" css="minimalista" inicialEstaExpandido={true}>
                    <p className="sourceSansPro">{racaExibida.tamanho}</p>
                  </Card>
                  <Card titulo="Deslocamentos" css="minimalista" inicialEstaExpandido={true}>
                    {racaExibida.deslocamentos.map((deslocamento) => (
                      <p key={deslocamento.tipo} className="sourceSansPro">
                        {deslocamento.tipo}: {deslocamento.valor} metros
                      </p>
                    ))}
                  </Card>
                  <Card titulo="Descrição" css="minimalista" inicialEstaExpandido={true}>
                    <p className="sourceSansPro">{racaExibida.descricao}</p>
                  </Card>
                  <h2 className={styles.titulo}>Poderes de {racaExibida.nome}</h2>
                  {poderes &&
                    poderes
                      .filter((poder) => poder.tags.some((tag) => tag.label === racaExibida!.nome))
                      .map((poder) => (
                        <div key={poder.key}>
                          <CardPoder poder={poder} />
                        </div>
                      ))}
                </div>
              )}
            </div>
          </div>
        )}
        {etapaFormulario === 'classe' && (
          <div className={styles.doublePanel}>
            <ul className={styles.customSelect}>
              {classes &&
                classes.map((classe) => (
                  <li
                    key={classe.id}
                    onClick={() => setValue('classe', classe.nome, { shouldValidate: true })}
                    className={classeExibida?.nome === classe.nome ? styles.ativo : undefined}
                  >
                    <div>
                      <p>{classe.nome}</p>
                    </div>
                  </li>
                ))}
            </ul>
            <div className={styles.descriptionPanel}>
              {classeExibida && (
                <div className={styles.cards}>
                  <h2 className={styles.titulo}>{classeExibida.nome}</h2>
                  <Card css="minimalista" titulo="Pontos de vida" inicialEstaExpandido={true}>
                    <p className="sourceSansPro">
                      PV no 1º nível: {classeExibida.vidaInicial} + constituição
                    </p>
                    <p className="sourceSansPro">
                      PV por nível: {classeExibida.vidaPorNivel} + constituição
                    </p>
                  </Card>
                  <Card css="minimalista" titulo="Pontos de mana" inicialEstaExpandido={true}>
                    <p className="sourceSansPro">PM por nível: {classeExibida.manaPorNivel}</p>
                  </Card>
                  <h2 className={styles.titulo}>Poderes de {classeExibida.nome}</h2>
                  {poderes &&
                    poderes
                      .filter((poder) =>
                        poder.tags.some((tag) => tag.label === classeExibida!.nome)
                      )
                      .map((poder) => (
                        <div key={poder.key}>
                          <CardPoder poder={poder} />
                        </div>
                      ))}
                </div>
              )}
            </div>
          </div>
        )}
        {etapaFormulario === 'atributos' && (
          <fieldset className={styles.fieldset}>
            <legend>Atributos</legend>
            <div className={styles.rowFields}>
              {atributosDefault &&
                atributosDefault.map((atributo, index) => (
                  <FormGroup
                    key={index}
                    name={`${atributo.nome}Base`}
                    label={atributo.nome.substring(0, 3)}
                    type="number"
                    placeholder="0"
                  />
                ))}
            </div>
            <Card titulo="Atributos finais" css="minimalista" inicialEstaExpandido={true}>
              {atributosFinais &&
                atributosFinais.map((atributo, index) => (
                  <div key={index}>
                    <p>{atributo.nome}</p>
                    <p>{atributo.valorAtual}</p>
                  </div>
                ))}
            </Card>
          </fieldset>
        )}
        {etapaFormulario === 'final' && (
          <>
            {Object.entries(errors).map(([field, error]) => (
              <p className={styles.alert} role="alert" key={field}>
                {error.message}!
              </p>
            ))}
            <input className={styles.submitButton} type="submit" value="Criar personagem" />
          </>
        )}
      </form>
    </FormProvider>
  )
}
