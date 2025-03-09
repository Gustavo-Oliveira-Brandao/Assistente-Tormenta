import BotaoModular from '@renderer/components/botao-modular/botao-modular'
import styles from './sidebar-ficha.module.scss'
import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import BarraRecurso from '@renderer/components/barra-recurso/barra-recurso'
import CardPericia from '@renderer/components/card-pericia/card-pericia'
import { z } from 'zod'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import Modal from '../modal/modal'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormGroup from '@renderer/components/form-group/form-group'
import { useAtualizarPersonagemMutation } from '@renderer/hooks/mutations/personagem/useAtualizarPersonagemMutation'
import { detalhesSchema } from '@renderer/validators/schemas/detalhesSchema'
import { opcoesRacas } from '@renderer/forms/select options/opcoesRacas'
import { opcoesClasses } from '@renderer/forms/select options/opcoesClasses'
import { opcoesDivindades } from '@renderer/forms/select options/opcoesDivindades'
import { defesaSchema } from '@renderer/validators/schemas/defesaSchema'
import { useAtualizarDefesaMutation } from '@renderer/hooks/mutations/defesa/useAtualizarDefesaMutation'
import { opcoesAtributos } from '@renderer/forms/select options/opcoesAtributos'
import { deslocamentoSchema } from '@renderer/validators/schemas/deslocamentoSchema'
import { useAtualizarDeslocamentoMutation } from '@renderer/hooks/mutations/deslocamento/useAtualizarDeslocamentoMutation'

const SidebarFicha = ({ personagem }: { personagem: PersonagemT20 }): JSX.Element => {
  const [formulario, setFormulario] = useState<string | null>(null)

  const methodsDetalhes = useForm<z.infer<typeof detalhesSchema>>({
    resolver: zodResolver(detalhesSchema),
    defaultValues: {
      nome: personagem.nome,
      raca: personagem.raca,
      classe: personagem.classe,
      origem: personagem.origem,
      divindade: personagem.divindade,
      nivel: personagem.nivel,
      experiencia: personagem.experiencia
    }
  })

  const methodsDefesa = useForm<z.infer<typeof defesaSchema>>({
    resolver: zodResolver(defesaSchema),
    defaultValues: {
      armadura: personagem.defesa.armadura,
      escudo: personagem.defesa.escudo,
      outros: personagem.defesa.outros,
      temporario: personagem.defesa.temporario,
      atributo: personagem.defesa.atributo,
      penalidadeArmaduraTotal: personagem.defesa.penalidadeArmaduraTotal
    }
  })

  const methodsDeslocamento = useForm<z.infer<typeof deslocamentoSchema>>({
    resolver: zodResolver(deslocamentoSchema),
    defaultValues: {
      caminhada: personagem.deslocamento.caminhada,
      escalada: personagem.deslocamento.escalada,
      natacao: personagem.deslocamento.natacao,
      voo: personagem.deslocamento.voo,
      escavacao: personagem.deslocamento.escavacao
    }
  })

  const atualizarDetalhesPersonagem = useAtualizarPersonagemMutation()
  const atualizarDefesa = useAtualizarDefesaMutation()
  const atualizarDeslocamento = useAtualizarDeslocamentoMutation()

  const onEditDetalhes: SubmitHandler<z.infer<typeof detalhesSchema>> = async (
    data
  ): Promise<void> => {
    const personagemCopy = { ...personagem }
    personagemCopy.nome = data.nome
    personagemCopy.raca = data.raca
    personagemCopy.classe = data.classe
    personagemCopy.origem = data.origem
    personagemCopy.divindade = data.divindade
    personagemCopy.nivel = data.nivel
    personagemCopy.experiencia = data.experiencia
    atualizarDetalhesPersonagem.mutate(personagemCopy)
    setFormulario(null)
  }

  const onEditDefesa: SubmitHandler<z.infer<typeof defesaSchema>> = async (data): Promise<void> => {
    const defesaCopy = { ...personagem.defesa }
    defesaCopy.armadura = data.armadura
    defesaCopy.escudo = data.escudo
    defesaCopy.outros = data.outros
    defesaCopy.temporario = data.temporario
    defesaCopy.atributo = data.atributo
    defesaCopy.penalidadeArmaduraTotal = data.penalidadeArmaduraTotal
    atualizarDefesa.mutate(defesaCopy)
    setFormulario(null)
  }

  const onEditDeslocamento: SubmitHandler<z.infer<typeof deslocamentoSchema>> = async (
    data
  ): Promise<void> => {
    const deslocamentoCopy = { ...personagem.deslocamento }
    deslocamentoCopy.caminhada = data.caminhada
    deslocamentoCopy.escalada = data.escalada
    deslocamentoCopy.escavacao = data.escavacao
    deslocamentoCopy.natacao = data.natacao
    deslocamentoCopy.voo = data.voo
    atualizarDeslocamento.mutate(deslocamentoCopy)
    setFormulario(null)
  }

  return (
    <aside className={styles.sidebar}>
      <div onClick={() => setFormulario('detalhes')} className={styles.fotoPersonagem}>
        <img src={'./character.png'} alt="" />
        <span className={styles.opacidade}></span>
        <div className={styles.detalhes}>
          <div className={styles.detalhe}>
            <img src={'./icons/default/raca.svg'} alt="Raça" />
            <p>{personagem.raca}</p>
          </div>
          <div className={styles.detalhe}>
            <img src={'./icons/default/classe.svg'} alt="Raça" />
            <p>{personagem.classe}</p>
          </div>
          <div className={styles.detalhe}>
            <img src={'./icons/default/origem.svg'} alt="Raça" />
            <p>{personagem.origem}</p>
          </div>
          <div className={styles.detalhe}>
            <img src={'./icons/default/divindade.svg'} alt="Raça" />
            <p>{personagem.divindade}</p>
          </div>
        </div>
      </div>

      <div className={styles.nome}>
        <p>{personagem.nome}</p>
      </div>
      <div className={styles.barrasRecurso}>
        <BarraRecurso categoria="vida" recurso={personagem.vida} />
        <BarraRecurso categoria="mana" recurso={personagem.mana} />
      </div>

      <div className={styles.infoSecundaria}>
        <div className={styles.titulo}>
          <h2>Defesa</h2>
        </div>
        <div className={styles.recurso}>
          <img src="./icons/default/ca.svg" alt="Defesa" />
          <BotaoModular
            onClickEvent={() => setFormulario('defesa')}
            texto={personagem.defesa.valorAtual}
            css="recursoSecundario"
          />
        </div>
      </div>

      <div className={styles.infoSecundaria}>
        <div className={styles.titulo}>
          <h2>Deslocamento</h2>
        </div>
        <div className={styles.recurso}>
          <img src={'./icons/default/deslocamento.svg'} alt="Deslocamento" />
          <BotaoModular
            onClickEvent={() => setFormulario('deslocamento')}
            texto={personagem.deslocamento.caminhada}
            css="recursoSecundario"
          />
        </div>
      </div>

      <div className={styles.infoSecundaria}>
        <div className={styles.titulo}>
          <h2>Iniciativa</h2>
        </div>
        <div className={styles.pericias}>
          {personagem.pericias.map((pericia) =>
            pericia.nome == 'iniciativa' ? (
              <CardPericia key={pericia.id} pericia={pericia} css="sidebar" />
            ) : null
          )}
        </div>
      </div>
      {formulario === 'detalhes' &&
        createPortal(
          <Modal titulo="Detalhes" onClose={() => setFormulario(null)} height="fit-content">
            <FormProvider {...methodsDetalhes}>
              <form onSubmit={methodsDetalhes.handleSubmit(onEditDetalhes)}>
                <fieldset>
                  <legend>Detalhes</legend>
                  <div className="d-flex">
                    <FormGroup
                      name="nome"
                      label="nome:"
                      placeholder="Ragnar Montealto"
                      type="text"
                    />
                    <FormGroup name="raca" label="raça:" type="dropdown" options={opcoesRacas} />
                    <FormGroup
                      name="classe"
                      label="classe:"
                      type="dropdown"
                      options={opcoesClasses}
                    />
                    <FormGroup name="origem" label="origem:" placeholder="Taverneiro" type="text" />
                    <FormGroup
                      name="divindade"
                      label="divindade:"
                      type="dropdown"
                      options={opcoesDivindades}
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Experiência</legend>
                  <div className="d-flex">
                    <FormGroup
                      name="nivel"
                      label="nivel:"
                      placeholder={String(personagem.nivel)}
                      type="number"
                    />
                    <FormGroup
                      name="experiencia"
                      label="xp:"
                      placeholder={String(personagem.experiencia)}
                      type="number"
                    />
                  </div>
                </fieldset>
                {Object.entries(methodsDetalhes.formState.errors).map(([field, error]) => (
                  <p role="alert" key={field}>
                    {error.message}!
                  </p>
                ))}
                <input type="submit" value="Salvar" />
              </form>
            </FormProvider>
          </Modal>,
          document.body
        )}
      {formulario === 'defesa' &&
        createPortal(
          <Modal titulo="Defesa" onClose={() => setFormulario(null)} height="fit-content">
            <FormProvider {...methodsDefesa}>
              <form onSubmit={methodsDefesa.handleSubmit(onEditDefesa)}>
                <fieldset>
                  <legend>Valores de defesa</legend>
                  <div className="d-flex">
                    <FormGroup name="armadura" label="armadura:" placeholder="0" type="number" />
                    <FormGroup name="escudo" label="escudo:" placeholder="0" type="number" />
                    <FormGroup name="outros" label="outros:" placeholder="0" type="number" />
                    <FormGroup name="temporario" label="temp:" placeholder="0" type="number" />
                    <FormGroup
                      name="atributo"
                      label="atributo:"
                      type="dropdown"
                      options={opcoesAtributos}
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Penalidade de armadura</legend>
                  <div className="d-flex">
                    <FormGroup
                      name="penalidadeArmaduraTotal"
                      label="Valor:"
                      placeholder="0"
                      type="number"
                    />
                  </div>
                </fieldset>
                <input type="submit" value="Salvar" />
              </form>
            </FormProvider>
          </Modal>,
          document.body
        )}
      {formulario === 'deslocamento' &&
        createPortal(
          <Modal titulo="Deslocamento" onClose={() => setFormulario(null)} height="fit-content">
            <FormProvider {...methodsDeslocamento}>
              <form onSubmit={methodsDeslocamento.handleSubmit(onEditDeslocamento)}>
                <fieldset>
                  <legend>Valores de deslocamento</legend>
                  <div className="d-flex">
                    <FormGroup name="caminhada" label="caminhada:" placeholder="9" type="number" />
                    <FormGroup name="voo" label="vôo:" placeholder="0" type="number" />
                    <FormGroup name="natacao" label="natação:" placeholder="0" type="number" />
                    <FormGroup name="escalada" label="escalada:" placeholder="0" type="number" />
                    <FormGroup name="escavacao" label="escavação:" placeholder="0" type="number" />
                  </div>
                </fieldset>
                <input type="submit" value="Salvar" />
              </form>
            </FormProvider>
          </Modal>,
          document.body
        )}
    </aside>
  )
}

export default SidebarFicha
