import { Atributo } from '@renderer/@types/t20/Atributo'
import styles from './card-atributo.module.scss'
import BotaoRolagem from '../botao-rolagem/botao-rolagem'
import { useState } from 'react'
import Modal from '@renderer/templates/modal/modal'
import { createPortal } from 'react-dom'
import FormGroup from '../form-group/form-group'
import { useAtualizarAtributoMutation } from '@renderer/hooks/useAtributoMutations'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const CardAtributo = ({ atributo }: { atributo: Atributo }): JSX.Element => {
  const [modal, abrirModal] = useState(false)
  const atualizarAtributo = useAtualizarAtributoMutation()

  const atributoSchema = z
    .object({
      valor: z.coerce
        .number()
        .min(-100, 'Atributo deve ser maior que -100')
        .max(100, 'Atributo deve ser menor que 100')
        .default(atributo.valor),
      bonus: z.coerce
        .number()
        .min(-100, 'Bônus deve ser maior que -100')
        .max(100, 'Bônus deve ser menor que 100')
        .default(atributo.bonus)
    })
    .required()

  const methods = useForm<z.infer<typeof atributoSchema>>({
    resolver: zodResolver(atributoSchema),
    defaultValues: atributoSchema.parse({})
  })

  const { handleSubmit } = methods

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
                <FormGroup
                  name="valor"
                  label="valor base:"
                  placeholder={String(atributo.valor)}
                  type="number"
                />
                <FormGroup
                  name={'bonus'}
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
