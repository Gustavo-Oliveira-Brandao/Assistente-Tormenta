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

const SidebarFicha = ({ personagem }: { personagem: PersonagemT20 }): JSX.Element => {
  const teste = (): void => {
    console.log('teste')
  }

  const [formulario, setFormulario] = useState<string | null>(null)

  const detalhesSchema = z.object({
    nome: z.coerce.string().nonempty('Nome não pode ficar vazio').default(personagem.nome),
    raca: z.coerce.string().nonempty('Raça não pode ficar vazia').default(personagem.raca),
    classe: z.coerce.string().nonempty('Classe não pode ficar vazia').default(personagem.classe),
    origem: z.coerce.string().nonempty('Origem não pode ficar vazia').default(personagem.origem),
    divindade: z.coerce
      .string()
      .nonempty('Divindade não pode ficar vazia')
      .default(personagem.divindade),
    nivel: z.coerce
      .number()
      .positive('Nivel não pode ser abaixo de 1')
      .max(20, 'O nivel máximo é 20')
      .default(personagem.nivel),
    experiencia: z.coerce
      .number()
      .positive('Experiência não pode ser negativa')
      .default(personagem.experiencia)
  })

  const methodsDetalhes = useForm<z.infer<typeof detalhesSchema>>({
    resolver: zodResolver(detalhesSchema),
    defaultValues: detalhesSchema.parse({})
  })

  const onEditDetalhes: SubmitHandler<z.infer<typeof detalhesSchema>> = async (
    data
  ): Promise<void> => {
    console.log(data)
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
                    <FormGroup
                      name="raca"
                      label="raça:"
                      placeholder={personagem.raca}
                      type="text"
                    />
                    <FormGroup
                      name="classe"
                      label="classe:"
                      placeholder={personagem.classe}
                      type="text"
                    />
                    <FormGroup
                      name="origem"
                      label="origem:"
                      placeholder={personagem.origem}
                      type="text"
                    />
                    <FormGroup
                      name="divindade"
                      label="divindade:"
                      placeholder={personagem.divindade}
                      type="text"
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
                      label="exp:"
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
            onClickEvent={teste}
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
            onClickEvent={teste}
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
    </aside>
  )
}

export default SidebarFicha
