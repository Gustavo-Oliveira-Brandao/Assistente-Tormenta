import { JSX, useEffect, useMemo, useState } from 'react'
import styles from './menu-principal.module.scss'
import { useDispatch } from 'react-redux'
import { useExibirTodosPersonagem } from '@renderer/hooks/selectors/usePersonagemQuery'
import { useNavigate } from 'react-router-dom'
import { selecionarPersonagem } from '@renderer/store/slices/personagemSlice'
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
import { CardPoder } from '@renderer/components/card-poder/card-poder'
import { OptionModular, SelectFieldModular } from '@renderer/components/select-field/select-field'
import { atributosData } from '@renderer/utils/common data/atributosData'
import { NumberFieldModular } from '@renderer/components/number-field/number-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { eticoData, moralData } from '@renderer/utils/common data/alinhamentoData'
import { useExibirCompendio } from '@renderer/hooks/selectors/useCompendioQuery'

export const MenuPrincipal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [criacaoPersonagemEstaAberta, setCriacaoPersonagemEstaAberta] = useState(false)
  const [selecaoPersonagensEstaAberta, setSelecaoPersonagensEstaAberta] = useState(false)
  const [personagemSelecionado, setPersonagemSelecionado] = useState<IPersonagem | null>(null)

  const { data: personagens } = useExibirTodosPersonagem()

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
            <BotaoModular font="tormenta20Font" css="botaoMenuPrincipal" cor="vermelhoEscuro">
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
  const [racaSelecionada, setRacaSelecionada] = useState<string>(
    '25c5e36c-e3a3-429a-9b90-92d19fed9446'
  )
  const [classeSelecionada, setClasseSelecionada] = useState<string>(
    '82372b8c-75a9-4f98-86f1-5886a6eb0084'
  )
  const [origemSelecionada, setOrigemSelecionada] = useState<string>(
    '9ad3f5fb-c6b6-47b8-9124-9349c8ffe95d'
  )
  const [divindadeSelecionada, setDivindadeSelecionada] = useState<string>(
    '1ff50850-67a7-49a8-a890-e3abbc9b9af1'
  )
  const [etapaFormulario, setEtapaFormulario] = useState('DETALHES')

  const { data: compendio } = useExibirCompendio()

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
    if (!compendio) {
      return null
    }
    for (const classe of compendio.classes) {
      if (classe.key == classeSelecionada) {
        methods.setValue('classeInicial', classe.nome)
        return classe
      }
    }
    return null
  }, [compendio, classeSelecionada, methods])

  const racaExibida = useMemo(() => {
    if (!compendio) {
      return null
    }
    for (const raca of compendio.racas) {
      if (raca.key == racaSelecionada) {
        methods.setValue('raca', raca.nome)
        return raca
      }
    }
    return null
  }, [compendio, racaSelecionada, methods])

  const origemExibida = useMemo(() => {
    if (!compendio) {
      return null
    }
    for (const origem of compendio.origens) {
      if (origem.key == origemSelecionada) {
        methods.setValue('origem', origem.nome)
        return origem
      }
    }
    return null
  }, [compendio, methods, origemSelecionada])

  const divindadeExibida = useMemo(() => {
    if (!compendio) {
      return null
    }

    for (const divindade of compendio.divindades) {
      if (divindade.key == divindadeSelecionada) {
        methods.setValue('divindade', divindade.nome)
        return divindade
      }
    }
    return null
  }, [compendio, divindadeSelecionada, methods])

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
                  compendio?.racas.map((raca) => (
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
                  compendio?.classes.map((classe) => (
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
                {etapaFormulario == 'ORIGEM' &&
                  compendio?.origens.map((origem) => (
                    <BotaoModular
                      onClickEvent={() => setOrigemSelecionada(origem.key)}
                      key={origem.key}
                      css={origemSelecionada == origem.key ? 'botaoItemSelecionado' : 'botaoItem'}
                      cor="transparente"
                    >
                      <p className="tormenta20Font">{origem.nome}</p>
                    </BotaoModular>
                  ))}
                {etapaFormulario == 'DIVINDADE' &&
                  compendio?.divindades.map((divindade) => (
                    <BotaoModular
                      key={divindade.key}
                      onClickEvent={() => setDivindadeSelecionada(divindade.key)}
                      css={
                        divindadeSelecionada == divindade.key ? 'botaoItemSelecionado' : 'botaoItem'
                      }
                      cor="transparente"
                    >
                      <img
                        src={`./icons/${divindade.nome.toLowerCase()}.svg`}
                        alt={divindade.nome}
                      />
                      <p className="tormenta20Font">{divindade.nome}</p>
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
                  onClickEvent={() => setEtapaFormulario('ORIGEM')}
                >
                  <p className="tormenta20Font">Origem</p>
                </BotaoModular>
              </>
            )}
            {etapaFormulario == 'ORIGEM' && (
              <>
                <BotaoModular
                  css="botaoFooterModal"
                  cor="verdePrimario"
                  onClickEvent={() => setEtapaFormulario('CLASSE')}
                >
                  <p className="tormenta20Font">Classe</p>
                </BotaoModular>
                <BotaoModular
                  css="botaoFooterModal"
                  cor="verdePrimario"
                  onClickEvent={() => setEtapaFormulario('DIVINDADE')}
                >
                  <p className="tormenta20Font">Atributos</p>
                </BotaoModular>
              </>
            )}
            {etapaFormulario == 'DIVINDADE' && (
              <>
                <BotaoModular
                  css="botaoFooterModal"
                  cor="verdePrimario"
                  onClickEvent={() => setEtapaFormulario('ORIGEM')}
                >
                  <p className="tormenta20Font">Classe</p>
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
          </div>
        }
      >
        <form onSubmit={methods.handleSubmit(criarPersonagem)}>
          {etapaFormulario == 'DETALHES' && (
            <>
              <FieldsetModular legend={<p className="inter">Detalhes</p>}>
                <TextFieldModular placeholder="Ragnar" name="nome" label="Nome" />
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
                      {compendio?.poderes
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
          {etapaFormulario == 'ORIGEM' && (
            <div className={styles.selecaoPersonagem}>
              {origemExibida && (
                <>
                  <div className={styles.info}>
                    <h1 className="tormenta20Font">{origemExibida.nome}</h1>
                  </div>
                  <div className={styles.description}>
                    <p className="inter">{origemExibida.descricao}</p>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Itens concedidos</h3>
                      <div>
                        <p className="inter">{origemExibida.itens}</p>
                      </div>
                    </div>

                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>
                        Beneficios (escolha dois)
                      </h3>
                      <div>
                        <p className="inter">{origemExibida.beneficios}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {etapaFormulario == 'DIVINDADE' && (
            <div className={styles.selecaoPersonagem}>
              {divindadeExibida && (
                <>
                  <div className={styles.info}>
                    <h1 className="tormenta20Font">{divindadeExibida.nome}</h1>
                  </div>
                  <div className={styles.description}>
                    <p className="inter">{divindadeExibida.descricao}</p>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Crenças e objetivos</h3>
                      <div>
                        <p className="inter">{divindadeExibida.crencas}</p>
                      </div>
                    </div>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Símbolo sagrado</h3>
                      <div>
                        <p className="inter">{divindadeExibida.simbolo}</p>
                      </div>
                    </div>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Canalizar energia</h3>
                      <div>
                        <p className="inter"> {divindadeExibida.canalizarEnergia}</p>
                      </div>
                    </div>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Devotos</h3>
                      <div>
                        <p className="inter">{divindadeExibida.devotos}</p>
                      </div>
                    </div>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Obrigações e restrições</h3>
                      <div>
                        <p className="inter">{divindadeExibida.obrigacoes}</p>
                      </div>
                    </div>
                    <div className={styles.secao}>
                      <h3 className={`tormenta20Font ${styles.titulo}`}>Arma preferida</h3>
                      <div>
                        <p className="inter">{divindadeExibida.armaPreferida}</p>
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
