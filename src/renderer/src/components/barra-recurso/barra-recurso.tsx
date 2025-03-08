import { useEffect, useState } from 'react'
import styles from './barra-recurso.module.scss'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Recurso } from '@renderer/@types/t20/Recurso'
import { zodResolver } from '@hookform/resolvers/zod'
import FormGroup from '../form-group/form-group'
import { useAtualizarVidaMutation } from '@renderer/hooks/mutations/recurso/useAtualizarVidaMutation'
import { useAtualizarManaMutation } from '@renderer/hooks/mutations/recurso/useAtualizarManaMutation'
import { recursoSchema } from '@renderer/validators/schemas/recursoSchema'

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
    if (recurso.valorAtual >= 0) {
      setLarguraBarra((recurso.valorAtual / recurso.valorMaximo) * 100)
    }
    if (recurso.valorAtual < 0) {
      setLarguraBarra(0)
    }
  }, [recurso.valorAtual, recurso.valorMaximo])

  const atributos = [
    {
      value: 'nenhum',
      text: 'nenhum'
    },
    {
      value: 'forca',
      text: 'força'
    },
    {
      value: 'destreza',
      text: 'destreza'
    },
    {
      value: 'constituicao',
      text: 'constituição'
    },
    {
      value: 'inteligencia',
      text: 'inteligência'
    },
    {
      value: 'sabedoria',
      text: 'sabedoria'
    },
    {
      value: 'carisma',
      text: 'carisma'
    }
  ]

  const atualizarVida = useAtualizarVidaMutation()
  const atualizarMana = useAtualizarManaMutation()

  const onEdit: SubmitHandler<z.infer<typeof recursoSchema>> = async (data): Promise<void> => {
    const recursoAtualizado = { ...recurso }
    recursoAtualizado.valorAtual = data.valorAtual
    recursoAtualizado.valorTemporario = data.valorTemporario
    recursoAtualizado.valorBase = data.valorBase
    recursoAtualizado.valorPorNivel = data.valorPorNivel
    recursoAtualizado.atributo = data.atributo
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
      valorPorNivel: recurso.valorPorNivel,
      valorBase: recurso.valorBase,
      atributo: recurso.atributo
    }
  })
  const {
    handleSubmit,
    formState: { errors }
  } = methods

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
                    <FormGroup
                      name="valorBase"
                      label={`base:`}
                      placeholder={String(recurso.valorBase)}
                      type="number"
                    />
                    <FormGroup
                      name="valorPorNivel"
                      label="p/nível:"
                      placeholder={String(recurso.valorPorNivel)}
                      type="number"
                    />
                    {categoria === 'vida' && (
                      <FormGroup
                        name="atributo"
                        label="atributo:"
                        type="dropdown"
                        options={atributos}
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
                      options={atributos}
                    />
                  </fieldset>
                )}
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
