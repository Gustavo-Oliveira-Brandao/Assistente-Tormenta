import { IRecurso } from '@renderer/@types/t20/Recurso'
import styles from './card-recurso.module.scss'
import BotaoModular from '../botao-modular/botao-modular'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { recursoSchema } from '@renderer/validators/schemas/recursoSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormGroup from '../form-group/form-group'

export const CardRecurso = ({
  recurso,
  icon
}: {
  recurso: IRecurso
  icon: string
}): JSX.Element => {
  const [modal, setModal] = useState(false)

  const methods = useForm<z.infer<typeof recursoSchema>>({
    resolver: zodResolver(recursoSchema),
    defaultValues: {
      valorAtual: recurso.valorAtual,
      valorTemporario: recurso.valorTemporario,
      atributo: recurso.atributo,
      bonus: recurso.bonus
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bonus'
  })

  const onEdit: SubmitHandler<z.infer<typeof recursoSchema>> = async (data): Promise<void> => {
    console.log(data)
  }

  return (
    <>
      <div className={styles.recurso}>
        <img src={icon} alt={recurso.categoria} />
        <BotaoModular
          onClickEvent={() => setModal(true)}
          texto={recurso.valorAtual}
          css="recursoSecundario"
        />
      </div>
      {modal &&
        createPortal(
          <Modal titulo={recurso.categoria} onClose={() => setModal(false)} height="400px">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onEdit)}>
                <fieldset>
                  <legend>{recurso.categoria} atual</legend>
                  <div className="d-flex">
                    <FormGroup
                      name="valorAtual"
                      label="atual:"
                      placeholder={String(recurso.valorAtual)}
                      type="number"
                    />
                    <FormGroup
                      name="valorTemporario"
                      label="temp:"
                      placeholder={String(recurso.valorTemporario)}
                      type="number"
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Modificadores de {recurso.categoria} maxima</legend>
                  {fields.map((field, index) => (
                    <div className="d-flex" key={field.id}>
                      <FormGroup
                        name={`bonus.${index}.label`}
                        label="nome:"
                        placeholder="Robusto"
                        type="text"
                      />
                      <FormGroup
                        name={`bonus.${index}.valor`}
                        label="valor:"
                        placeholder="0"
                        type="number"
                      />
                      <FormGroup name={`bonus.${index}.estaAtivo`} label="ativo:" type="checkbox" />
                      <FormGroup
                        name={`bonus.${index}.ehPorNivel`}
                        label="P/ nivel?"
                        type="checkbox"
                      />
                      <BotaoModular
                        css="botaoInteracao"
                        icone="./icons/delete.svg"
                        onClickEvent={() => remove(index)}
                      />
                    </div>
                  ))}

                  <BotaoModular
                    css="botaoAdicionar"
                    onClickEvent={() =>
                      append({
                        label: 'Buff',
                        valor: 0,
                        estaAtivo: false,
                        ehPorNivel: false
                      })
                    }
                    texto="Adicionar modificador"
                    icone="./icons/plus-solid.svg"
                  />
                </fieldset>
                {Object.entries(errors).map(([field, error]) => (
                  <p role="alert" key={field}>
                    {error.message}!
                  </p>
                ))}
                <input type="submit" value="salvar" />
              </form>
            </FormProvider>
          </Modal>,
          document.body
        )}
    </>
  )
}
