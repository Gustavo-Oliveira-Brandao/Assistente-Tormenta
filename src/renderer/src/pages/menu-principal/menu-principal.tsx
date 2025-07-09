import { JSX, useMemo, useState } from 'react'
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
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { criacaoPersonagemSchema } from '@renderer/validators/schemas/personagem'
import { FieldsetModular } from '@renderer/components/fieldset/fieldset'
import { TextFieldModular } from '@renderer/components/text-field/text-field'
import { useExibirRacasDefault } from '@renderer/hooks/selectors/useRacaQuery'
import { useExibirPoderesDefault } from '@renderer/hooks/selectors/usePoderQuery'
import { CardPoder } from '@renderer/components/card-poder/card-poder'

export const MenuPrincipal = (): JSX.Element => {
  const dispatch = useDispatch()

  const [criacaoPersonagemEstaAberta, setCriacaoPersonagemEstaAberta] = useState(false)
  const [selecaoPersonagensEstaAberta, setSelecaoPersonagensEstaAberta] = useState(false)
  const [personagemSelecionado, setPersonagemSelecionado] = useState<IPersonagem | null>(null)
  const { data: personagens } = useExibirTodosPersonagem()
  const {data: compendioPoderes} = useExibirPoderesDefault()
  const navigate = useNavigate()
  const criarPersonagemMutation = useCriarPersonagemDemo()
  const [etapaFormulario, setEtapaFormulario] = useState('DETALHES')
  const methods = useForm<z.infer<typeof criacaoPersonagemSchema>>()

  const { data: racas } = useExibirRacasDefault()
  const [racaSelecionada, setRacaSelecionada] = useState(1)

  const racaExibida = useMemo(() => {
    if (!racas) {
      return null
    }
    for (const raca of racas) {
      if (raca.key == racaSelecionada) {
        return raca
      }
    }
    return null
  }, [racas, racaSelecionada])

  const selecionarPersonagemPorId = (id: number): void => {
    dispatch(selecionarPersonagem(id))
    navigate('/personagem')
  }

  const selecionarPersonagemExibido = async (id: number): Promise<void> => {
    const personagemCarregado = await exibirPersonagemPorId(id)
    setPersonagemSelecionado(personagemCarregado)
  }

  const criarPersonagem = (data): void => {
    console.log(data)
  }

  return (
    <main className={styles.mainMenu}>
      <div className={styles.backdrop}></div>
      <div className={styles.screen}>
        <h1 className="tormenta20Font">Arquivos de Tanna-Toh</h1>
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
                                  onClickEvent={() => setRacaSelecionada(raca.key)}
                                  key={raca.key}
                                  css={
                                    racaSelecionada == raca.key
                                      ? 'botaoItemSelecionado'
                                      : 'botaoItem'
                                  }
                                  cor="transparente"
                                >
                                  <img src={`./icons/${raca.icone}.svg`} alt={raca.nome} />
                                  <p className="tormenta20Font">{raca.nome}</p>
                                </BotaoModular>
                              ))}
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
                      </div>
                    }
                  >
                    <form onSubmit={methods.handleSubmit(criarPersonagem)}>
                      {etapaFormulario == 'DETALHES' && (
                        <>
                          <FieldsetModular legend={<p className="inter">Detalhes</p>}>
                            <TextFieldModular placeholder="Ragnar" name="nome" label="Nome" />
                            <TextFieldModular placeholder="18" name="idade" label="Idade" />
                            <TextFieldModular placeholder="1,50m" name="altura" label="Altura" />
                            <TextFieldModular placeholder="80kg" name="peso" label="Peso" />
                          </FieldsetModular>
                          <FieldsetModular legend={<p className="inter">Alinhamento</p>}>
                            <TextFieldModular
                              placeholder="Leal"
                              name="alinhamentoEtico"
                              label="Ético"
                            />
                            <TextFieldModular
                              placeholder="Bom"
                              name="alinhamentoMoral"
                              label="Moral"
                            />
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
                                  <div className={styles.itens}>
                                  {racaExibida.atributos.map((atributo) => (
                                    <p key={atributo.atributo} className='inter'><span className={styles.title}>{atributo.atributo}:</span> { atributo.valor }</p>
                                  ))}</div>
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
                    </form>
                  </ModalModular>
                </FormProvider>
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
                  <div className={styles.smallInfo}>
                    <p className={'tormenta20Font'}>
                      {personagem.raca} {personagem.classeInicial} {personagem.nivelAtual}
                    </p>
                  </div>
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
                  <h2 className="inter">Status</h2>
                  <div className={styles.itens}>
                    <p className="inter">
                      <span className={styles.title}>Pontos de vida: </span>{' '}
                      {personagemSelecionado.status.vidaMaxima}
                    </p>
                    <p className="inter">
                      <span className={styles.title}>Pontos de mana: </span>{' '}
                      {personagemSelecionado.status.manaMaxima}
                    </p>
                    <p className="inter">
                      <span className={styles.title}>Defesa: </span>{' '}
                      {personagemSelecionado.status.defesaAtual}
                    </p>
                    <p className="inter">
                      <span className={styles.title}>Deslocamento de caminhada: </span>{' '}
                      {personagemSelecionado.deslocamento.caminhadaAtual}
                    </p>
                  </div>
                  <hr />
                  <h2 className="inter">Atributos</h2>
                  <div className={styles.itens}>
                    {personagemSelecionado.atributos
                      .sort((a, b) => a.ordem - b.ordem)
                      .map((atributo) => (
                        <p key={atributo.id} className="inter">
                          <span className={styles.title}>{atributo.nome}:</span>{' '}
                          {atributo.valorAtual != null && atributo.valorAtual > 0
                            ? `+${atributo.valorAtual}`
                            : `${atributo.valorAtual}`}
                        </p>
                      ))}
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
