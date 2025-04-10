import { useEffect, useState } from 'react'
import styles from './barra-recurso.module.scss'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { IRecurso } from '@renderer/@types/t20/Recurso'
import { zodResolver } from '@hookform/resolvers/zod'
import FormGroup from '../form-group/form-group'
import { recursoSchema } from '@renderer/validators/schemas/recursoSchema'
import { opcoesAtributos } from '@renderer/forms/select options/opcoesAtributos'
import BotaoModular from '../botao-modular/botao-modular'
import { useAtualizarRecursoMutation } from '@renderer/hooks/mutations/recurso/useAtualizarRecursoMutation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'

const BarraRecurso = ({ recurso }: { recurso: IRecurso }): JSX.Element => {
  const [larguraBarra, setLarguraBarra] = useState(0)
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  useEffect(() => {
    if (recurso.valorAtual >= 0) {
      setLarguraBarra((recurso.valorAtual / recurso.valorMaximo) * 100)
    }
    if (recurso.valorAtual < 0) {
      setLarguraBarra(0)
    }
  }, [recurso.valorAtual, recurso.valorMaximo])

  const atualizarRecurso = useAtualizarRecursoMutation()

  const onEdit: SubmitHandler<z.infer<typeof recursoSchema>> = async (data): Promise<void> => {
    const recursoAtualizado = { ...recurso }
    recursoAtualizado.valorAtual = data.valorAtual
    recursoAtualizado.valorTemporario = data.valorTemporario
    recursoAtualizado.atributo = data.atributo
    recursoAtualizado.bonus = data.bonus
    atualizarRecurso.mutate(recursoAtualizado)
    dispatch(fecharModal())
  }

  const methods = useForm<z.infer<typeof recursoSchema>>({
    resolver: zodResolver(recursoSchema),
    defaultValues: recursoSchema.parse(recurso)
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

  return (
    <>
      <div
        onClick={() => dispatch(abrirModal(`RECURSO_${recurso.categoria}_EDICAO_MODAL`))}
        className={styles.barraRecurso}
      >
        <div
          className={`${styles[recurso.categoria]} ${styles.barra}`}
          style={{ width: `${larguraBarra}%` }}
        ></div>
        <div className={styles.texto}>
          <p>{recurso.valorAtual + '/' + recurso.valorMaximo}</p>
        </div>
      </div>

      {modalAberto == `RECURSO_${recurso.categoria}_EDICAO_MODAL` &&
        createPortal(
          <Modal
            titulo={recurso.categoria}
            onClose={() => dispatch(fecharModal())}
            height="fit-content"
          >
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onEdit)}>
                <fieldset>
                  <legend>{recurso.categoria} atual</legend>
                  <div className="d-flex">
                    <FormGroup
                      name="valorAtual"
                      label={`atual:`}
                      placeholder={String(recurso.valorAtual)}
                      type="number"
                    />
                    <FormGroup
                      name="valorTemporario"
                      label={`temp:`}
                      placeholder={String(recurso.valorTemporario)}
                      type="number"
                    />
                  </div>
                </fieldset>
                {recurso.atributo && (
                  <fieldset>
                    <legend>{recurso.categoria} maxima</legend>
                    <div className="d-flex">
                      <FormGroup
                        name="atributo"
                        label="atributo:"
                        type="dropdown"
                        options={opcoesAtributos}
                      />
                    </div>
                  </fieldset>
                )}
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

export default BarraRecurso
