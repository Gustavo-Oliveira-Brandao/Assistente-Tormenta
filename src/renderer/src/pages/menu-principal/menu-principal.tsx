import { JSX, useEffect, useMemo, useState } from 'react'
import styles from './menu-principal.module.scss'
import { useDispatch } from 'react-redux'
import { useExibirTodosPersonagem } from '@renderer/hooks/selectors/usePersonagemQuery'
import { useNavigate } from 'react-router-dom'
import { selecionarPersonagem } from '@renderer/store/slices/personagemSlice'
import { useCriarPersonagemDemo } from '@renderer/hooks/mutations/usePersonagemMutations'
import { exibirPoderesDefault } from '@renderer/api/poder-service'
import { Button, DialogTrigger } from 'react-aria-components'
import { ModalModular } from '@renderer/components/modal/modal'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { exibirPersonagemPorId } from '@renderer/api/personagem-service'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { criacaoPersonagemSchema } from '@renderer/validators/schemas/personagem'
import { FieldsetModular } from '@renderer/components/fieldset/fieldset'
import { TextFieldModular } from '@renderer/components/text-field/text-field'
import { useExibirRacasDefault } from '@renderer/hooks/selectors/useRacaQuery'
import { useExibirPoderesDefault } from '@renderer/hooks/selectors/usePoderQuery'
import { CardPoder } from '@renderer/components/card-poder/card-poder'
import { OptionModular, SelectFieldModular } from '@renderer/components/select-field/select-field'
import { atributosData } from '@renderer/utils/common data/atributosData'
import { NumberFieldModular } from '@renderer/components/number-field/number-field'
import { useExibirClassesDefault } from '@renderer/hooks/selectors/useClasseQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { divindadesData } from '@renderer/utils/common data/divindadesData'
import { eticoData, moralData } from '@renderer/utils/common data/alinhamentoData'
import { useExibirCompendioMagias } from '@renderer/hooks/selectors/useMagiaQuery'

export const MenuPrincipal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [criacaoPersonagemEstaAberta, setCriacaoPersonagemEstaAberta] = useState(false)
  const [selecaoPersonagensEstaAberta, setSelecaoPersonagensEstaAberta] = useState(false)
  const [personagemSelecionado, setPersonagemSelecionado] = useState<IPersonagem | null>(null)

  const { data: personagens } = useExibirTodosPersonagem()
  const { data: poderes } = useExibirPoderesDefault()
  const { data: racas } = useExibirRacasDefault()
  const { data: classes } = useExibirClassesDefault()
  const { data: magias} = useExibirCompendioMagias()
  const navigate = useNavigate()

  const selecionarPersonagemPorId = (id: number): void => {
    dispatch(selecionarPersonagem(id))
    if (personagemSelecionado) {
      navigate(`/personagem/${personagemSelecionado.id}`)
    }
  }

  const selecionarPersonagemExibido = async (id: number): Promise<void> => {
    const personagemCarregado = await exibirPersonagemPorId(id)
    setPersonagemSelecionado(personagemCarregado)
  }

  return (
    <main className={styles.mainMenu}>
      <div className={styles.backdrop}></div>
      <div className={styles.screen}>
        <h1 className="tormenta20Font">Arquivos de Tanna-Toh</h1>
        <div className={styles.footer}>
          <div className={styles.botoes}>
            <BotaoModular
              font="tormenta20Font"
              css="botaoMenuPrincipal"
              cor="vermelhoEscuro"
              onClickEvent={() => setSelecaoPersonagensEstaAberta(true)}
            >
              <p>Personagens</p>
            </BotaoModular>
            <BotaoModular
              font="tormenta20Font"
              css="botaoMenuPrincipal"
              cor="vermelhoEscuro"
              onClickEvent={() => {
                window.open('https://jamboeditora.com.br/', '_blank')
                return false
              }}
            >
              <p>Adquira Tormenta20</p>
            </BotaoModular>
            <BotaoModular
              font="tormenta20Font"
              css="botaoMenuPrincipal"
              cor="vermelhoEscuro"
              onClickEvent={() => exibirPoderesDefault()}
            >
              <p>Sair</p>
            </BotaoModular>
          </div>
          <p className={`${styles.copyright} inter`}>
            Isso se trata de um produto NÃO-OFICIAL. Tormenta 20 pertence a Jambo Editora. Todos os
            direitos são reservados a editora.
          </p>
        </div>
      </div>
      <DialogTrigger
        isOpen={selecaoPersonagensEstaAberta}
        onOpenChange={setSelecaoPersonagensEstaAberta}
      >
        <ModalModular
          placement="center"
          titulo="Selecionar personagem"
          height="500px"
          width="800px"
          footer={
            <>
              <DialogTrigger
                isOpen={criacaoPersonagemEstaAberta}
                onOpenChange={setCriacaoPersonagemEstaAberta}
              >
                <BotaoModular css="botaoFooterModal" cor="verdePrimario" font="tormenta20Font">
                  <p>Criar personagem</p>
                </BotaoModular>
                <CriacaoPersonagemForm
                  setCriacaoPersonagemEstaAberta={setCriacaoPersonagemEstaAberta}
                />
              </DialogTrigger>
              <BotaoModular
                css="botaoFooterModal"
                onClickEvent={() => {
                  if (personagemSelecionado) {
                    selecionarPersonagemPorId(personagemSelecionado.id)
                  }
                }}
                cor="verdePrimario"
                font="tormenta20Font"
              >
                <p>Selecionar personagem</p>
              </BotaoModular>
            </>
          }
          sidebar={
            <div className={styles.personagens}>
              {personagens?.map((personagem) => (
                <Button
                  onClick={() => selecionarPersonagemExibido(personagem.id)}
                  key={personagem.id}
                  className={
                    personagemSelecionado != null && personagemSelecionado.id == personagem.id
                      ? `${styles.personagem} ${styles.selecionado}`
                      : `${styles.personagem}`
                  }
                  type="button"
                >
                  <p className={`tormenta20Font ${styles.nome}`}>{personagem.nome}</p>
                  <p className={'tormenta20Font'}>
                    {personagem.raca} {personagem.classeInicial} {personagem.nivelAtual}
                  </p>
                </Button>
              ))}
            </div>
          }
        >
          <div className={styles.selecaoPersonagem}>
            {personagemSelecionado && (
              <>
                <div className={styles.info}>
                  <h1 className="tormenta20Font">{personagemSelecionado.nome}</h1>
                  <h1 className="tormenta20Font">
                    {personagemSelecionado.classeInicial} {personagemSelecionado.nivelAtual}
                  </h1>
                </div>
                <div className={styles.tags}>
                  <p className="tormenta20Font">{personagemSelecionado.raca}</p>
                  <p className="tormenta20Font">{personagemSelecionado.tipo}</p>
                  <p className="tormenta20Font">{personagemSelecionado.tamanho}</p>
                  <p className="tormenta20Font">{personagemSelecionado.origem}</p>
                  <p className="tormenta20Font">{personagemSelecionado.divindade}</p>
                </div>
                <div className={styles.description}>
                  <div className={styles.secao}>
                    <h3 className={`${styles.titulo} tormenta20Font`}>Status</h3>
                    <div className={styles.itens}>
                      <p className="inter">
                        Pontos de vida: {personagemSelecionado.status.vidaMaxima}
                      </p>
                      <p className="inter">
                        Pontos de mana: {personagemSelecionado.status.manaMaxima}
                      </p>
                      <p className="inter">Defesa: {personagemSelecionado.status.defesaAtual}</p>
                    </div>
                  </div>
                  <div className={styles.secao}>
                    <h3 className={`${styles.titulo} tormenta20Font`}>Atributos</h3>
                    <div className={styles.itens}>
                      {personagemSelecionado.atributos
                        .sort((a, b) => a.ordem - b.ordem)
                        .map((atributo) => (
                          <p key={atributo.id} className="inter">
                            {atributo.nome}:{' '}
                            {atributo.valorAtual != null && atributo.valorAtual > 0
                              ? `+${atributo.valorAtual}`
                              : `${atributo.valorAtual}`}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ModalModular>
      </DialogTrigger>
    </main>
  )
}

type CriacaoPersonagemFormProps = {
  setCriacaoPersonagemEstaAberta: React.Dispatch<React.SetStateAction<boolean>>
}

export const CriacaoPersonagemForm = ({
  setCriacaoPersonagemEstaAberta
}: CriacaoPersonagemFormProps): JSX.Element => {
  const [racaSelecionada, setRacaSelecionada] = useState(1)
  const [classeSelecionada, setClasseSelecionada] = useState(1)
  const [etapaFormulario, setEtapaFormulario] = useState('DETALHES')

  const { data: compendioPoderes } = useExibirPoderesDefault()
  const { data: racas } = useExibirRacasDefault()
  const { data: classes } = useExibirClassesDefault()

  const criarPersonagemMutation = useCriarPersonagemDemo()

  const methods = useForm<z.infer<typeof criacaoPersonagemSchema>>({
    resolver: zodResolver(criacaoPersonagemSchema),
    defaultValues: {
      nome: 'Escolha um nome',
      origem: 'Escolha uma origem',
      divindade: 'ateu',
      alinhamentoEtico: 'neutro',
      alinhamentoMoral: 'neutro',
      forcaBase: 0,
      destrezaBase: 0,
      constituicaoBase: 0,
      inteligenciaBase: 0,
      sabedoriaBase: 0,
      carismaBase: 0
    }
  })
  const { control } = methods

  const { fields: periciasTreinadasFields, append: appendPericiaTreinada } = useFieldArray({
    control: control,
    name: 'periciasTreinadas'
  })

  const { fields: atributosRacaFields, append: appendAtributoRaca } = useFieldArray({
    control: control,
    name: 'atributosRaca'
  })

  const classeExibida = useMemo(() => {
    if (!classes) {
      return null
    }
    for (const classe of classes) {
      if (classe.key == classeSelecionada) {
        methods.setValue('classeInicial', classe.nome)
        return classe
      }
    }
    return null
  }, [classes, classeSelecionada, methods])

  const racaExibida = useMemo(() => {
    if (!racas) {
      return null
    }
    for (const raca of racas) {
      if (raca.key == racaSelecionada) {
        methods.setValue('raca', raca.nome)
        return raca
      }
    }
    return null
  }, [racas, racaSelecionada, methods])

  useEffect(() => {
    methods.setValue('atributosRaca', [])

    if (racaExibida) {
      for (const atributo of racaExibida.atributos) {
        appendAtributoRaca({
          atributo: atributo.atributo,
          valor: atributo.valor
        })
      }
    }
  }, [racaExibida, methods, appendAtributoRaca])

  useEffect(() => {
    methods.setValue('periciasTreinadas', [])

    if (classeExibida) {
      for (let i = 0; i < classeExibida.numeroPericiasExtras; i++) {
        appendPericiaTreinada({
          nome: classeExibida.periciasExtras[i],
          nomeOficio: 'Nome padrão'
        })
      }
    }
  }, [classeExibida, appendPericiaTreinada, methods])

  const criarPersonagem = (data): void => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <ModalModular
        placement="center"
        width="700px"
        height="500px"
        titulo="Criar personagem"
        sidebar={
          etapaFormulario != 'DETALHES' && (
            <>
              <div className={styles.siderbarItens}>
                {etapaFormulario == 'RACA' &&
                  racas?.map((raca) => (
                    <BotaoModular
                      onClickEvent={() => {
                        setRacaSelecionada(raca.key)
                      }}
                      key={raca.key}
                      css={racaSelecionada == raca.key ? 'botaoItemSelecionado' : 'botaoItem'}
                      cor="transparente"
                    >
                      <img src={`./icons/${raca.icone}.svg`} alt={raca.nome} />
                      <p className="tormenta20Font">{raca.nome}</p>
                    </BotaoModular>
                  ))}
                {etapaFormulario == 'CLASSE' &&
                  classes?.map((classe) => (
                    <BotaoModular
                      onClickEvent={() => {
                        setClasseSelecionada(classe.key)
                      }}
                      key={classe.key}
                      css={classeSelecionada == classe.key ? 'botaoItemSelecionado' : 'botaoItem'}
                      cor="transparente"
                    >
                      <img src={`./icons/${classe.icone}.svg`} alt={classe.nome} />
                      <p className="tormenta20Font">{classe.nome}</p>
                    </BotaoModular>
                  ))}
                {etapaFormulario == 'ATRIBUTOS' && (
                  <div className={styles.description}>
                    <div className={styles.campos}>
                      <div className={styles.campo}>
                        <NumberFieldModular
                          name="forcaBase"
                          placeholder="0"
                          css="start"
                          label="Força"
                        />
                      </div>
                      <div className={styles.campo}>
                        <NumberFieldModular
                          name="destrezaBase"
                          placeholder="0"
                          css="start"
                          label="Destreza"
                        />
                      </div>
                      <div className={styles.campo}>
                        <NumberFieldModular
                          name="constituicaoBase"
                          placeholder="0"
                          css="start"
                          label="Constituição"
                        />
                      </div>
                      <div className={styles.campo}>
                        <NumberFieldModular
                          name="inteligenciaBase"
                          placeholder="0"
                          css="start"
                          label="Inteligência"
                        />
                      </div>
                      <div className={styles.campo}>
                        <NumberFieldModular
                          name="sabedoriaBase"
                          placeholder="0"
                          css="start"
                          label="Sabedoria"
                        />
                      </div>
                      <div className={styles.campo}>
                        <NumberFieldModular
                          name="carismaBase"
                          placeholder="0"
                          css="start"
                          label="Carisma"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )
        }
        footer={
          <div className={styles.etapasFormulario}>
            {etapaFormulario == 'DETALHES' && (
              <>
                <BotaoModular
                  css="botaoFooterModal"
                  cor="vermelhoEscuro"
                  onClickEvent={() => setCriacaoPersonagemEstaAberta(false)}
                >
                  <p className="tormenta20Font">Cancelar</p>
                </BotaoModular>
                <BotaoModular
                  css="botaoFooterModal"
                  cor="verdePrimario"
                  onClickEvent={() => setEtapaFormulario('RACA')}
                >
                  <p className="tormenta20Font">Raça</p>
                </BotaoModular>
              </>
            )}
            {etapaFormulario == 'RACA' && (
              <>
                <BotaoModular
                  css="botaoFooterModal"
                  cor="verdePrimario"
                  onClickEvent={() => setEtapaFormulario('DETALHES')}
                >
                  <p className="tormenta20Font">Detalhes</p>
                </BotaoModular>
                <BotaoModular
                  css="botaoFooterModal"
                  cor="verdePrimario"
                  onClickEvent={() => setEtapaFormulario('CLASSE')}
                >
                  <p className="tormenta20Font">Classe</p>
                </BotaoModular>
              </>
            )}
            {etapaFormulario == 'CLASSE' && (
              <>
                <BotaoModular
                  css="botaoFooterModal"
                  cor="verdePrimario"
                  onClickEvent={() => setEtapaFormulario('RACA')}
                >
                  <p className="tormenta20Font">Raça</p>
                </BotaoModular>
                <BotaoModular
                  css="botaoFooterModal"
                  cor="verdePrimario"
                  onClickEvent={() => setEtapaFormulario('ATRIBUTOS')}
                >
                  <p className="tormenta20Font">Atributos</p>
                </BotaoModular>
              </>
            )}
            {etapaFormulario == 'ATRIBUTOS' && (
              <>
                <BotaoModular
                  css="botaoFooterModal"
                  cor="verdePrimario"
                  onClickEvent={() => setEtapaFormulario('CLASSE')}
                >
                  <p className="tormenta20Font">Classe</p>
                </BotaoModular>
              </>
            )}
          </div>
        }
      >
        <form onSubmit={methods.handleSubmit(criarPersonagem)}>
          {etapaFormulario == 'DETALHES' && (
            <>
              <FieldsetModular legend={<p className="inter">Detalhes</p>}>
                <TextFieldModular placeholder="Ragnar" name="nome" label="Nome" />
                <TextFieldModular placeholder="Taverneiro" name="origem" label="Origem" />
                <SelectFieldModular name="divindade" label="Divindade">
                  <OptionModular name="ateu" value="Nenhuma" />
                  {divindadesData.map((opt) => (
                    <OptionModular key={opt.value} name={opt.value} value={opt.nome} />
                  ))}
                </SelectFieldModular>
              </FieldsetModular>
              <FieldsetModular legend={<p className="inter">Alinhamento</p>}>
                <SelectFieldModular name="alinhamentoEtico" label="Ético">
                  {eticoData.map((opt) => (
                    <OptionModular key={opt.value} name={opt.value} value={opt.nome} />
                  ))}
                </SelectFieldModular>
                <SelectFieldModular name="alinhamentoMoral" label="Moral">
                  {moralData.map((opt) => (
                    <OptionModular key={opt.value} name={opt.value} value={opt.nome} />
                  ))}
                </SelectFieldModular>
              </FieldsetModular>
            </>
          )}
          {etapaFormulario == 'RACA' && (
            <div className={styles.selecaoPersonagem}>
              {racaExibida && (
                <>
                  <div className={styles.info}>
                    <h1 className="tormenta20Font">{racaExibida.nome}</h1>
                  </div>
                  <div className={styles.tags}>
                    <p className="tormenta20Font">{racaExibida.tipo}</p>
                    <p className="tormenta20Font">{racaExibida.tamanho}</p>
                  </div>
                  <div className={styles.description}>
                    <p className="inter">{racaExibida.descricao}</p>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Atributos</h3>
                      <div className={styles.campos}>
                        {atributosRacaFields.map((field, index) => (
                          <div key={field.id} className={styles.campo}>
                            <SelectFieldModular
                              label="Atributo"
                              name={`atributosRaca.${index}.atributo`}
                            >
                              {atributosData.map((opt) => (
                                <OptionModular key={opt.value} name={opt.value} value={opt.nome} />
                              ))}
                            </SelectFieldModular>
                            <NumberFieldModular
                              name={`atributosRaca.${index}.valor`}
                              label="Valor"
                              css="start"
                              placeholder="0"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Poderes</h3>
                      {compendioPoderes
                        ?.filter((poder) => poder.fonte == racaExibida.nome)
                        .map((poder) => <CardPoder key={poder.key} poder={poder} />)}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {etapaFormulario == 'CLASSE' && (
            <div className={styles.selecaoPersonagem}>
              {classeExibida && (
                <>
                  <div className={styles.info}>
                    <h1 className="tormenta20Font">{classeExibida.nome}</h1>
                  </div>
                  <div className={styles.description}>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Status por nivel</h3>
                      <div className={styles.itens}>
                        <p className="inter">
                          Pontos de vida iniciais: {classeExibida.vidaInicial} + Constituição
                        </p>
                        <p className="inter">
                          Pontos de vida por nivel: {classeExibida.vidaPorNivel} + Constituição
                        </p>
                        <p className="inter">
                          Pontos de mana: {classeExibida.manaPorNivel} por nível
                        </p>
                      </div>
                    </div>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Pericias treinadas</h3>

                      <div className={styles.itens}>
                        {classeExibida.pericias.map((pericia) => (
                          <p key={pericia} className="inter">
                            {pericia}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>
                        Pericias extras treinadas
                      </h3>
                      <div className={styles.campos}>
                        {periciasTreinadasFields.map((field, index) => (
                          <div key={field.id} className={styles.campo}>
                            <SelectFieldModular
                              label="Pericia"
                              name={`periciasTreinadas.${index}.nome`}
                            >
                              {classeExibida.periciasExtras.map((pericia) => (
                                <OptionModular key={pericia} name={pericia} value={pericia} />
                              ))}
                            </SelectFieldModular>
                            {methods.watch(`periciasTreinadas.${index}.nome`) == 'oficio' && (
                              <TextFieldModular
                                placeholder="Culinaria"
                                name={`periciasTreinadas.${index}.nomeOficio`}
                                label="Nome"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Proficiências</h3>
                      <div className={styles.itens}>
                        {classeExibida.proficiencias.length > 0 ? (
                          classeExibida.proficiencias.map((prof) => (
                            <p key={prof.nome} className="inter">
                              {prof.nome}
                            </p>
                          ))
                        ) : (
                          <p className="inter">Nenhuma</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {etapaFormulario == 'ATRIBUTOS' && (
            <div className={styles.selecaoPersonagem}>
              <></>
            </div>
          )}
        </form>
      </ModalModular>
    </FormProvider>
  )
}
