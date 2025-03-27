import styles from './card-atributo.module.scss'
import BotaoRolagem from '../botao-rolagem/botao-rolagem'
import { useState } from 'react'
import Modal from '@renderer/templates/modal/modal'
import { createPortal } from 'react-dom'
import FormGroup from '../form-group/form-group'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtualizarAtributoMutation } from '@renderer/hooks/mutations/atributo/useAtualizarAtributoMutation'
import { atributoSchema } from '@renderer/validators/schemas/atributoSchema'
import { IAtributo } from '@renderer/@types/t20/Atributo'
import BotaoModular from '../botao-modular/botao-modular'

const CardAtributo = ({ atributo }: { atributo: IAtributo }): JSX.Element => {
  const [modal, abrirModal] = useState(false)
  const atualizarAtributo = useAtualizarAtributoMutation()

  const methods = useForm<z.infer<typeof atributoSchema>>({
    resolver: zodResolver(atributoSchema),
    defaultValues: {
      valor: atributo.valor,
      bonus: atributo.bonus
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

  const onEdit: SubmitHandler<z.infer<typeof atributoSchema>> = async (data): Promise<void> => {
    const novoAtributo = { ...atributo }
    novoAtributo.valor = data.valor
    novoAtributo.bonus = data.bonus
    atualizarAtributo.mutate(novoAtributo)
    abrirModal(false)
  }

  return (
    <>
      <div className={styles.atributo}>
        <div className={styles.titulo}>
          <button onClick={() => abrirModal(true)}>{atributo.nome}</button>
        </div>
        <BotaoRolagem valor={atributo.valorAtual} />
      </div>
      {modal &&
        createPortal(
          <Modal titulo={atributo.nome} onClose={() => abrirModal(false)} height="fit-content">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onEdit)}>
                <fieldset>
                  <legend>Atributo</legend>
                  <div className="d-flex">
                    <FormGroup
                      name="valor"
                      label="valor:"
                      placeholder={String(atributo.valor)}
                      type="number"
                    />
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Bônus</legend>
                  {fields.map((field, index) => (
                    <div key={field.id} className="d-flex">
                      <FormGroup
                        name={`bonus.${index}.label`}
                        label="nome:"
                        placeholder="Forma selvagem"
                        type="text"
                      />
                      <FormGroup
                        name={`bonus.${index}.valor`}
                        label="valor:"
                        placeholder="0"
                        type="number"
                      />
                      <FormGroup name={`bonus.${index}.estaAtivo`} label="Ativo:" type="checkbox" />
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
                        estaAtivo: false
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
                <input type="submit" value="Salvar" />
              </form>
            </FormProvider>
          </Modal>,
          document.body
        )}
    </>
  )
}

export default CardAtributo
