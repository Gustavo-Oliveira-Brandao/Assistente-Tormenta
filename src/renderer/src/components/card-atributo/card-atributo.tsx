import styles from './card-atributo.module.scss'
import BotaoRolagem from '../botao-rolagem/botao-rolagem'
import { useState } from 'react'
import Modal from '@renderer/templates/modal/modal'
import { createPortal } from 'react-dom'
import FormGroup from '../form-group/form-group'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtualizarAtributoMutation } from '@renderer/hooks/mutations/atributo/useAtualizarAtributoMutation'
import { atributoSchema } from '@renderer/validators/schemas/atributoSchema'
import { IAtributo } from '@renderer/@types/t20/Atributo'

const CardAtributo = ({ atributo }: { atributo: IAtributo }): JSX.Element => {
  const [modal, abrirModal] = useState(false)
  const atualizarAtributo = useAtualizarAtributoMutation()

  const methods = useForm<z.infer<typeof atributoSchema>>({
    resolver: zodResolver(atributoSchema),
    defaultValues: {
      valor: atributo.valor
    }
  })

  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const onEdit: SubmitHandler<z.infer<typeof atributoSchema>> = async (data): Promise<void> => {
    const novoAtributo = { ...atributo }
    novoAtributo.valor = data.valor
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
