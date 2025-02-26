import { useEffect, useState } from 'react'
import styles from './barra-recurso.module.scss'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Recurso } from '@renderer/@types/t20/Recurso'
import { zodResolver } from '@hookform/resolvers/zod'
import FormGroup from '../form-group/form-group'
import {
  useAtualizarManaMutation,
  useAtualizarVidaMutation
} from '@renderer/hooks/useRecursoMutations'

const BarraRecurso = ({
  categoria,
  recurso
}: {
  categoria: string
  recurso: Recurso
}): JSX.Element => {
  const [larguraBarra, setLarguraBarra] = useState(0)
  const [modal, abrirModal] = useState(false)

  useEffect(() => {
    setLarguraBarra((recurso.valorAtual / recurso.valorMaximo) * 100)
  }, [recurso.valorAtual, recurso.valorMaximo])

  const recursoSchema = z
    .object({
      valorAtual: z.coerce.number().default(recurso.valorAtual),
      valorTemporario: z.coerce.number().default(recurso.valorTemporario),
      valorPorNivel: z.coerce.number().default(recurso.valorPorNivel),
      valorBase: z.coerce.number().default(recurso.valorBase)
    })
    .required()

  const atualizarVida = useAtualizarVidaMutation()
  const atualizarMana = useAtualizarManaMutation()

  const onEdit: SubmitHandler<z.infer<typeof recursoSchema>> = async (data): Promise<void> => {
    const recursoAtualizado = { ...recurso }
    recursoAtualizado.valorAtual = data.valorAtual
    recursoAtualizado.valorTemporario = data.valorTemporario
    recursoAtualizado.valorBase = data.valorBase
    recursoAtualizado.valorPorNivel = data.valorPorNivel
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
    defaultValues: recursoSchema.parse({})
  })
  const { handleSubmit } = methods

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
                <FormGroup
                  name="valorAtual"
                  label={`${categoria} atual:`}
                  placeholder={String(recurso.valorAtual)}
                  type="number"
                />
                <FormGroup
                  name="valorTemporario"
                  label={`${categoria} temporaria:`}
                  placeholder={String(recurso.valorTemporario)}
                  type="number"
                />
                <FormGroup
                  name="valorBase"
                  label={`valor base:`}
                  placeholder={String(recurso.valorBase)}
                  type="number"
                />
                <FormGroup
                  name="valorPorNivel"
                  label="valor por nível:"
                  placeholder={String(recurso.valorPorNivel)}
                  type="number"
                />
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
