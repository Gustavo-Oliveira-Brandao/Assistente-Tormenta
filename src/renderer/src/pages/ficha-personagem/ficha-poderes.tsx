import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { JSX, useMemo, useState } from 'react'
import styles from './ficha-personagem.module.scss'
import { SecaoFicha } from '@renderer/templates/secao-ficha/secao-ficha'
import {
  useExibirPoderesDefault,
  useExibirPoderesPersonagem
} from '@renderer/hooks/selectors/usePoderQuery'
import { useExibirClassesDefault } from '@renderer/hooks/selectors/useClasseQuery'
import { useExibirRacasDefault } from '@renderer/hooks/selectors/useRacaQuery'
import { CardPoder } from '@renderer/components/card-poder/card-poder'
import { opcoesCategoriasPoderesGerais } from '@renderer/utils/select options/opcoesCategoriasPoderes'
import { useCriarPoder, useDeletarPoder } from '@renderer/hooks/mutations/usePoderMutation'
import { DeepPartial } from 'typeorm'
import { IPoderPersonagem } from '@renderer/@types/T20 GOTY/IPoder'
import { DialogTrigger, DisclosureGroup } from 'react-aria-components'
import { ModalModular } from '@renderer/components/modal/modal'
import { BotaoModular } from '@renderer/components/botao-modular/botao-modular'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectFieldModular } from '@renderer/components/select-field/select-field'

type FichaPoderesProps = {
  personagem: IPersonagem
}

const filtroPoderesSchema = z.object({
  categoriaPoderes: z.string(),
  filtroClassePesquisa: z.string(),
  filtroRacaPesquisa: z.string()
})

export const FichaPoderes = ({ personagem }: FichaPoderesProps): JSX.Element => {
  const { data: compendioPoderes } = useExibirPoderesDefault()
  const { data: compendioClasses } = useExibirClassesDefault()
  const { data: compendioRacas } = useExibirRacasDefault()
  const { data: poderesPersonagem } = useExibirPoderesPersonagem(personagem.id)

  const methodsFiltroPoderes = useForm<z.infer<typeof filtroPoderesSchema>>({
    resolver: zodResolver(filtroPoderesSchema),
    defaultValues: {
      categoriaPoderes: 'CLASSE',
      filtroClassePesquisa: personagem.classeInicial,
      filtroRacaPesquisa: personagem.raca
    }
  })

  const [categoriaPoderes, setCategoriaPoderes] = useState('CLASSE')
  const [filtroClassePesquisa, setFiltroClassePesquisa] = useState(personagem.classeInicial)
  const [filtroRacaPesquisa, setFiltroRacaPesquisa] = useState(personagem.raca)

  const [lojaEstaAberta, setLojaEstaAberta] = useState(false)

  const poderesFiltrados = useMemo(() => {
    if (!compendioPoderes) {
      return []
    }

    if (categoriaPoderes == 'RACA') {
      return compendioPoderes.filter((poder) => poder.fonte && poder.fonte == filtroRacaPesquisa)
    }

    if (categoriaPoderes == 'HABILIDADES_CLASSE') {
      return compendioPoderes
        .filter(
          (poder) =>
            poder.categoria &&
            poder.categoria == 'habilidade de classe' &&
            poder.fonte &&
            poder.fonte == filtroClassePesquisa
        )
        .sort((a, b) => {
          if (!a.nivel || !b.nivel) {
            return 0
          }
          return a.nivel - b.nivel
        })
    }

    if (categoriaPoderes == 'PODERES_CLASSE') {
      return compendioPoderes.filter(
        (poder) =>
          poder.categoria &&
          poder.categoria == 'poder de classe' &&
          poder.fonte &&
          poder.fonte == filtroClassePesquisa
      )
    }

    return compendioPoderes.filter(
      (poder) => poder.categoria && poder.categoria.toLowerCase() == categoriaPoderes.toLowerCase()
    )
  }, [categoriaPoderes, compendioPoderes, filtroClassePesquisa, filtroRacaPesquisa])

  const adicionarPoderMutation = useCriarPoder()
  const removerPoderMutation = useDeletarPoder()

  const adicionarPoder = (poder: DeepPartial<IPoderPersonagem>): void => {
    adicionarPoderMutation.mutate({
      poder: poder,
      nivelPoder: personagem.nivelAtual ?? 1,
      idPersonagem: personagem.id
    })
    setLojaEstaAberta(false)
  }

  return (
    <section className={styles.secaoPoderes}>
      <div className={styles.poderes}>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes de raça</h2>
              <BotaoModular
                css="botaoAcompanhanteHeader"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('RACA')
                  setLojaEstaAberta(true)
                }}
              >
                <img src="./icons/busca.svg" alt="buscar poderes" />
                <p>Buscar</p>
              </BotaoModular>
            </>
          }
          css="poderes"
        >
          <DisclosureGroup allowsMultipleExpanded>
            {poderesPersonagem &&
              poderesPersonagem
                .filter((poder) => poder.categoria == 'raca')
                .map((poder) => (
                  <CardPoder
                    key={poder.id}
                    poder={poder}
                    nivel={poder.nivel}
                    exibeFonte={true}
                    onInteract={() => removerPoderMutation.mutate(poder.id)}
                    iconeBotaoInteracao={'./icons/delete.svg'}
                  />
                ))}
          </DisclosureGroup>
        </SecaoFicha>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Habilidades de classe</h2>
              <BotaoModular
                css="botaoAcompanhanteHeader"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('HABILIDADES_CLASSE')
                  setLojaEstaAberta(true)
                }}
              >
                <img src="./icons/busca.svg" alt="buscar poderes" />
                <p>Buscar</p>
              </BotaoModular>
            </>
          }
          css="poderes"
        >
          <DisclosureGroup allowsMultipleExpanded>
            {poderesPersonagem &&
              poderesPersonagem
                .filter((poder) => poder.categoria == 'habilidade de classe')
                .map((poder) => (
                  <CardPoder
                    key={poder.id}
                    poder={poder}
                    nivel={poder.nivel}
                    exibeFonte={true}
                    onInteract={() => removerPoderMutation.mutate(poder.id)}
                    iconeBotaoInteracao={'./icons/delete.svg'}
                  />
                ))}
          </DisclosureGroup>
        </SecaoFicha>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes de classe</h2>
              <BotaoModular
                css="botaoAcompanhanteHeader"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('PODERES_CLASSE')
                  setLojaEstaAberta(true)
                }}
              >
                <img src="./icons/busca.svg" alt="buscar poderes" />
                <p>Buscar</p>
              </BotaoModular>
            </>
          }
          css="poderes"
        >
          <DisclosureGroup allowsMultipleExpanded>
            {poderesPersonagem &&
              poderesPersonagem
                .filter((poder) => poder.categoria == 'poder de classe')
                .map((poder) => (
                  <CardPoder
                    key={poder.id}
                    poder={poder}
                    nivel={poder.nivel}
                    exibeFonte={true}
                    onInteract={() => removerPoderMutation.mutate(poder.id)}
                    iconeBotaoInteracao={'./icons/delete.svg'}
                  />
                ))}
          </DisclosureGroup>
        </SecaoFicha>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes de origem</h2>
              <BotaoModular
                css="botaoAcompanhanteHeader"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('ORIGEM')
                  setLojaEstaAberta(true)
                }}
              >
                <img src="./icons/busca.svg" alt="buscar poderes" />
                <p>Buscar</p>
              </BotaoModular>
            </>
          }
          css="poderes"
        >
          <DisclosureGroup allowsMultipleExpanded>
            {poderesPersonagem &&
              poderesPersonagem
                .filter((poder) => poder.categoria == 'origem')
                .map((poder) => (
                  <CardPoder
                    key={poder.id}
                    poder={poder}
                    nivel={poder.nivel}
                    exibeFonte={true}
                    onInteract={() => removerPoderMutation.mutate(poder.id)}
                    iconeBotaoInteracao={'./icons/delete.svg'}
                  />
                ))}
          </DisclosureGroup>
        </SecaoFicha>
      </div>
      <div className={styles.poderes}>
        <SecaoFicha
          header={
            <>
              <h2 className="tormenta20Font">Poderes gerais</h2>
              <BotaoModular
                css="botaoAcompanhanteHeader"
                cor="transparente"
                font="tormenta20Font"
                onClickEvent={() => {
                  setCategoriaPoderes('COMBATE')
                  setLojaEstaAberta(true)
                }}
              >
                <img src="./icons/busca.svg" alt="buscar poderes" />
                <p>Buscar</p>
              </BotaoModular>
            </>
          }
          css="poderes"
        >
          <DisclosureGroup allowsMultipleExpanded>
            {poderesPersonagem &&
              poderesPersonagem
                .filter((poder) => poder.fonte == 'geral' && poder.categoria != 'origem')
                .map((poder) => (
                  <CardPoder
                    key={poder.id}
                    poder={poder}
                    nivel={poder.nivel}
                    exibeCategoria={true}
                    onInteract={() => removerPoderMutation.mutate(poder.id)}
                    iconeBotaoInteracao={'./icons/delete.svg'}
                  />
                ))}
          </DisclosureGroup>
        </SecaoFicha>
      </div>

      <DialogTrigger isOpen={lojaEstaAberta} onOpenChange={setLojaEstaAberta}>
        <ModalModular
          placement="center"
          height="90vh"
          width="750px"
          titulo="Compêndio de poderes"
          overflow="auto"
          sidebar={
            <FormProvider {...methodsFiltroPoderes}>
              <form className={styles.filtros}>
                <p className="tormenta20Font">Filtros</p>
                <div className={styles.filtro}>
                  <label htmlFor="categoriaPoder" className="tormenta20Font label">
                    Categoria
                  </label>
                  <select
                    id="categoriaPoder"
                    value={categoriaPoderes}
                    className="tormenta20Font select"
                    onChange={(e) => setCategoriaPoderes(e.target.value)}
                  >
                    <option value={'HABILIDADES_CLASSE'}>Habilidades de classe</option>
                    <option value={'PODERES_CLASSE'}>Poderes de classe</option>
                    <option value={'RACA'}>Raça</option>
                    {opcoesCategoriasPoderesGerais.map((opcao) => (
                      <option key={opcao} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </select>
                </div>
                {(categoriaPoderes == 'PODERES_CLASSE' ||
                  categoriaPoderes == 'HABILIDADES_CLASSE') && (
                  <div className={styles.filtro}>
                    <label htmlFor="filtroClasse" className="tormenta20Font label">
                      Classe
                    </label>
                    <select
                      id="filtroClasse"
                      value={filtroClassePesquisa}
                      className="tormenta20Font select"
                      onChange={(e) => setFiltroClassePesquisa(e.target.value)}
                    >
                      {compendioClasses &&
                        compendioClasses.map((classe) => (
                          <option key={classe.nome} value={classe.nome}>
                            {classe.nome}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                {categoriaPoderes == 'RACA' && (
                  <div className={styles.filtro}>
                    <label htmlFor="filtroRaca" className="tormenta20Font label">
                      Raça
                    </label>
                    <select
                      id="filtroRaca"
                      value={filtroRacaPesquisa}
                      className="tormenta20Font select"
                      onChange={(e) => setFiltroRacaPesquisa(e.target.value)}
                    >
                      {compendioRacas &&
                        compendioRacas.map((raca) => (
                          <option key={raca.nome} value={raca.nome}>
                            {raca.nome}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </form>
            </FormProvider>
          }
        >
          <DisclosureGroup allowsMultipleExpanded>
            {poderesFiltrados.map((poder) => (
              <CardPoder
                key={poder.key}
                poder={poder}
                iconeBotaoInteracao="./icons/adicao.svg"
                nivel={categoriaPoderes == 'HABILIDADES_CLASSE' ? poder.nivel : undefined}
                onInteract={() => adicionarPoder(poder)}
              />
            ))}
          </DisclosureGroup>
        </ModalModular>
      </DialogTrigger>
    </section>
  )
}
