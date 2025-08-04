import { JSX, useState } from 'react'
import styles from './menu-principal.module.scss'
import btnStyles from '@renderer/assets/styles/botoes.module.scss'
import { useExibirTodosPersonagem } from '@renderer/hooks/selectors/usePersonagemQuery'
import { useNavigate } from 'react-router-dom'
import { Button, DialogTrigger } from 'react-aria-components'
import { ModalModular } from '@renderer/components/modal/modal'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { exibirPersonagemPorId } from '@renderer/api/personagem-service'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { criacaoPersonagemSchema } from '@renderer/validators/schemas/personagem'
import { TextFieldModular } from '@renderer/components/text-field/text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCriarPersonagem } from '@renderer/hooks/mutations/usePersonagemMutations'

export const MenuPrincipal = (): JSX.Element => {
  const [criacaoPersonagemEstaAberta, setCriacaoPersonagemEstaAberta] = useState(false)
  const [selecaoPersonagensEstaAberta, setSelecaoPersonagensEstaAberta] = useState(false)
  const [personagemSelecionado, setPersonagemSelecionado] = useState<IPersonagem | null>(null)

  const { data: personagens } = useExibirTodosPersonagem()
  const adicionarPersonagem = useCriarPersonagem()

  const navigate = useNavigate()

  const methods = useForm<z.infer<typeof criacaoPersonagemSchema>>({
    resolver: zodResolver(criacaoPersonagemSchema)
  })

  const selecionarPersonagemPorId = (id: number): void => {
    if (personagemSelecionado) {
      navigate(`/personagem/${id}`)
    }
  }

  const selecionarPersonagemExibido = async (id: number): Promise<void> => {
    const personagemCarregado = await exibirPersonagemPorId(id)
    setPersonagemSelecionado(personagemCarregado)
  }

  const criarPersonagem = async (data): Promise<void> => {
    adicionarPersonagem.mutate(data.nome)
  }

  return (
    <main className={styles.mainMenu}>
      <div className={styles.backdrop}></div>
      <div className={styles.screen}>
        <h1 className="tormenta20Font">Arquivos de Tanna-Toh</h1>
        <div className={styles.footer}>
          <div className={styles.botoes}>
            <DialogTrigger
              isOpen={selecaoPersonagensEstaAberta}
              onOpenChange={setSelecaoPersonagensEstaAberta}
            >
              <Button
                className={`${styles.botaoMenu} tormenta20Font`}
                onPress={() => setSelecaoPersonagensEstaAberta(true)}
              >
                Personagens
              </Button>
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
                      <Button className={`${btnStyles.botaoFooterModal} tormenta20Font`}>
                        Criar personagem
                      </Button>
                      <ModalModular
                        placement="center"
                        titulo="Criar personagem"
                        height="fit-content"
                        width="fit-content"
                      >
                        <FormProvider {...methods}>
                          <form onSubmit={methods.handleSubmit(criarPersonagem)}>
                            <TextFieldModular placeholder="Ragnar" label="Nome" name="nome" />
                            <Button type="submit">Criar</Button>
                          </form>
                        </FormProvider>
                      </ModalModular>
                    </DialogTrigger>
                    <Button
                      className={`${btnStyles.botaoFooterModal} tormenta20Font`}
                      onPress={() => {
                        if (personagemSelecionado) {
                          selecionarPersonagemPorId(personagemSelecionado.id)
                        }
                      }}
                    >
                      <p>Selecionar personagem</p>
                    </Button>
                  </>
                }
                sidebar={
                  <div className={styles.personagens}>
                    {personagens &&
                      personagens.map((personagem) => (
                        <Button
                          onPress={() => selecionarPersonagemExibido(personagem.id)}
                          key={personagem.id}
                          className={
                            personagemSelecionado != null &&
                            personagemSelecionado.id == personagem.id
                              ? `${styles.personagem} ${styles.selecionado}`
                              : `${styles.personagem}`
                          }
                          type="button"
                        >
                          <div>
                            <p className={`tormenta20Font ${styles.nome}`}>{personagem.nome}</p>
                            <p className={'tormenta20Font'}>
                              {personagem.raca?.nome} {personagem.classeOriginal} {personagem.nivel}
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
                          {personagemSelecionado.classeOriginal} {personagemSelecionado.nivel}
                        </h1>
                      </div>
                      <div className={styles.tags}>
                        <p className="tormenta20Font">{personagemSelecionado.raca.nome}</p>
                        <p className="tormenta20Font">{personagemSelecionado.raca.tipo}</p>
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
                            <p className="inter">
                              Defesa: {personagemSelecionado.status.defesaAtual}
                            </p>
                          </div>
                        </div>
                        <div className={styles.secao}>
                          <h3 className={`${styles.titulo} tormenta20Font`}>Atributos</h3>
                          <div className={styles.itens}>
                            {personagemSelecionado.atributos.map((atributo) => (
                              <p key={atributo.id} className="inter">
                                {atributo.nome}:
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
            <Button
              className={`${styles.botaoMenu} tormenta20Font`}
              onPress={() => {
                window.open('https://jamboeditora.com.br/', '_blank')
                return false
              }}
            >
              Adquira Tormenta20
            </Button>
            <Button
              className={`${styles.botaoMenu} tormenta20Font`}
              onPress={() => console.log('anything')}
            >
              Sair
            </Button>
          </div>
          <p className={`${styles.copyright} inter`}>
            Isso se trata de um produto NÃO-OFICIAL. Tormenta 20 pertence a Jambo Editora. Todos os
            direitos são reservados a editora.
          </p>
        </div>
      </div>
    </main>
  )
}
