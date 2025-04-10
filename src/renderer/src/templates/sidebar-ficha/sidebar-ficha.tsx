import styles from './sidebar-ficha.module.scss'
import BarraRecurso from '@renderer/components/barra-recurso/barra-recurso'
import CardPericia from '@renderer/components/card-pericia/card-pericia'
import { z } from 'zod'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Modal from '../modal/modal'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormGroup from '@renderer/components/form-group/form-group'
import { useAtualizarPersonagemMutation } from '@renderer/hooks/mutations/personagem/useAtualizarPersonagemMutation'
import { opcoesRacas } from '@renderer/forms/select options/opcoesRacas'
import { opcoesClasses } from '@renderer/forms/select options/opcoesClasses'
import { opcoesDivindades } from '@renderer/forms/select options/opcoesDivindades'
import { ICriatura } from '@renderer/@types/t20/Criatura'
import { CardRecurso } from '@renderer/components/card-recurso/card-recurso'
import { personagemSchema } from '@renderer/validators/schemas/personagemSchema'
import { opcoesTamanhos } from '@renderer/forms/select options/opcoesTamanhos'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'

const SidebarFicha = ({ personagem }: { personagem: ICriatura }): JSX.Element => {
  useEffect(() => {}, [personagem])

  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  const methodsDetalhes = useForm<z.infer<typeof personagemSchema>>({
    resolver: zodResolver(personagemSchema),
    defaultValues: {
      nome: personagem.nome,
      raca: personagem.raca,
      classe: personagem.classe,
      origem: personagem.origem,
      divindade: personagem.divindade,
      nivel: personagem.nivel,
      experiencia: personagem.experiencia,
      tamanho: personagem.tamanho,
      alinhamento: personagem.alinhamento
    }
  })

  const atualizarDetalhesPersonagem = useAtualizarPersonagemMutation()

  const onEditDetalhes: SubmitHandler<z.infer<typeof personagemSchema>> = async (
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
    personagemCopy.alinhamento = data.alinhamento
    personagemCopy.tamanho = data.tamanho
    atualizarDetalhesPersonagem.mutate(personagemCopy)
    dispatch(fecharModal())
  }

  return (
    <aside className={styles.sidebar}>
      <div
        onClick={() => dispatch(abrirModal(`DETALHES_EDICAO_MODAL`))}
        className={styles.fotoPersonagem}
      >
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

      <div className={styles.personagemInfo}>
        <div className={styles.nome}>
          <p>{personagem.nome}</p>
        </div>
        <div className={styles.nivel}>
          <p>{personagem.nivel}</p>
        </div>
      </div>
      <div className={styles.barrasRecurso}>
        {personagem.recursos
          .filter((recurso) => recurso.categoria == 'vida' || recurso.categoria == 'mana')
          .sort((a, b) => {
            if (a.categoria < b.categoria) {
              return 1
            }
            if (a.categoria > b.categoria) {
              return -1
            }
            return 0
          })
          .map((recurso) => (
            <BarraRecurso key={recurso.id} recurso={recurso} />
          ))}
      </div>

      {personagem.recursos
        .filter((recurso) => recurso.categoria == 'defesa' || recurso.categoria == 'deslocamento')
        .map((recurso) => (
          <div key={recurso.id} className={styles.infoSecundaria}>
            <div className={styles.titulo}>
              <h2>{recurso.categoria}</h2>
            </div>
            <CardRecurso
              icon={`./icons/default/${recurso.categoria === 'defesa' ? 'ca' : 'deslocamento'}.svg`}
              recurso={recurso}
            />
          </div>
        ))}
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
      {modalAberto === 'DETALHES_EDICAO_MODAL' &&
        createPortal(
          <Modal titulo="Detalhes" onClose={() => dispatch(fecharModal())} height="fit-content">
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
    </aside>
  )
}

export default SidebarFicha
