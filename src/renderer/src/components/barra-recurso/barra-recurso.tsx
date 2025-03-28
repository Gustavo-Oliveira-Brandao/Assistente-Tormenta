import { useEffect, useState } from 'react'
import styles from './barra-recurso.module.scss'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { IRecurso } from '@renderer/@types/t20/Recurso'
import { zodResolver } from '@hookform/resolvers/zod'
import FormGroup from '../form-group/form-group'
import { useAtualizarVidaMutation } from '@renderer/hooks/mutations/recurso/useAtualizarVidaMutation'
import { useAtualizarManaMutation } from '@renderer/hooks/mutations/recurso/useAtualizarManaMutation'
import { recursoSchema } from '@renderer/validators/schemas/recursoSchema'
import { opcoesAtributos } from '@renderer/forms/select options/opcoesAtributos'
import BotaoModular from '../botao-modular/botao-modular'

const BarraRecurso = ({
  categoria,
  recurso
}: {
  categoria: string
  recurso: IRecurso
}): JSX.Element => {
  const [larguraBarra, setLarguraBarra] = useState(0)
  const [modal, abrirModal] = useState(false)

  useEffect(() => {
    if (recurso.valorAtual >= 0) {
      setLarguraBarra((recurso.valorAtual / recurso.valorMaximo) * 100)
    }
    if (recurso.valorAtual < 0) {
      setLarguraBarra(0)
    }
  }, [recurso.valorAtual, recurso.valorMaximo])

  const atualizarVida = useAtualizarVidaMutation()
  const atualizarMana = useAtualizarManaMutation()

  const onEdit: SubmitHandler<z.infer<typeof recursoSchema>> = async (data): Promise<void> => {
    const recursoAtualizado = { ...recurso }
    recursoAtualizado.valorAtual = data.valorAtual
    recursoAtualizado.valorTemporario = data.valorTemporario
    recursoAtualizado.atributo = data.atributo
    recursoAtualizado.bonus = data.bonus
    if (categoria === 'vida') {
      atualizarVida.mutate(recursoAtualizado)
    }
    if (categoria === 'mana') {
      atualizarMana.mutate(recursoAtualizado)
    }
    abrirModal(false)
  }

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

  return (
    <>
      <div onClick={() => abrirModal(true)} className={styles.barraRecurso}>
        <div
          className={`${styles[categoria]} ${styles.barra}`}
          style={{ width: `${larguraBarra}%` }}
        ></div>
        <div className={styles.texto}>
          <p>{recurso.valorAtual + '/' + recurso.valorMaximo}</p>
        </div>
      </div>

      {modal &&
        createPortal(
          <Modal titulo={categoria} onClose={() => abrirModal(false)} height="fit-content">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onEdit)}>
                <fieldset>
                  <legend>{categoria} atual</legend>
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
                <fieldset>
                  <legend>{categoria} maxima</legend>
                  <div className="d-flex">
                    {categoria === 'vida' && (
                      <FormGroup
                        name="atributo"
                        label="atributo:"
                        type="dropdown"
                        options={opcoesAtributos}
                      />
                    )}
                  </div>
                </fieldset>
                {categoria === 'mana' && (
                  <fieldset>
                    <legend>Limite de PM:</legend>
                    <FormGroup
                      name="atributo"
                      label="atributo:"
                      placeholder={String(recurso.atributo)}
                      type="dropdown"
                      options={opcoesAtributos}
                    />
                  </fieldset>
                )}
                <fieldset>
                  <legend>Modificadores de vida maxima</legend>
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
