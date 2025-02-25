import { Atributo } from '@renderer/@types/t20/Atributo'
import styles from './card-atributo.module.scss'
import BotaoRolagem from '../botao-rolagem/botao-rolagem'
import { useState } from 'react'
import Modal from '@renderer/templates/modal/modal'
import { createPortal } from 'react-dom'
import FormGroup from '../form-group/form-group'
import { useAtualizarAtributoMutation } from '@renderer/hooks/useAtributoMutation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const CardAtributo = ({ atributo }: { atributo: Atributo }): JSX.Element => {
  const [modal, abrirModal] = useState(false)
  const atualizarAtributo = useAtualizarAtributoMutation()

  const atributoSchema = z
    .object({
      atributoBonus: z.coerce.number().default(atributo.bonus)
    })
    .required()

  const methods = useForm<z.infer<typeof atributoSchema>>({
    resolver: zodResolver(atributoSchema),
    defaultValues: atributoSchema.parse({})
  })

  const { handleSubmit } = methods

  const onEdit: SubmitHandler<z.infer<typeof atributoSchema>> = async (data): Promise<void> => {
    console.log('teste')
    console.log(data.atributoBonus)
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
                <FormGroup
                  name={'atributoBonus'}
                  label={'bônus:'}
                  placeholder={String(atributo.bonus)}
                  type={'number'}
                />
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
