import styles from './card-pericia.module.scss'
import { useState } from 'react'
import BotaoRolagem from '../botao-rolagem/botao-rolagem'
import { createPortal } from 'react-dom'
import Modal from '@renderer/templates/modal/modal'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { periciaSchema } from '@renderer/validators/schemas/periciaSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtualizarPericiaMutation } from '@renderer/hooks/mutations/pericia/useAtualizarPericiaMutation'
import FormGroup from '../form-group/form-group'
import { opcoesAtributos } from '@renderer/forms/select options/opcoesAtributos'
import { opcoesTreinamento } from '@renderer/forms/select options/opcoesTreinamento'
import { IPericia } from '@renderer/@types/t20/Pericia'
import BotaoModular from '../botao-modular/botao-modular'

const CardPericia = ({ pericia, css }: { pericia: IPericia; css: string }): JSX.Element => {
  const [modal, setModal] = useState(false)
  const atualizarPericia = useAtualizarPericiaMutation()

  const methods = useForm<z.infer<typeof periciaSchema>>({
    resolver: zodResolver(periciaSchema),
    defaultValues: {
      treinamento: pericia.treinamento,
      atributo: pericia.atributo,
      bonus: pericia.bonus
    }
  })

  const { control, handleSubmit } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bonus'
  })

  const onEditPericia: SubmitHandler<z.infer<typeof periciaSchema>> = async (
    data
  ): Promise<void> => {
    const novaPericia = { ...pericia }
    novaPericia.treinamento = data.treinamento
    novaPericia.atributo = data.atributo
    novaPericia.bonus = data.bonus
    atualizarPericia.mutate(novaPericia)
    setModal(false)
  }

  return (
    <>
      {modal &&
        createPortal(
          <Modal titulo={pericia.nome} onClose={() => setModal(false)} height="fit-content">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onEditPericia)}>
                <fieldset>
                  <legend>Pericia</legend>
                  <div className="d-flex">
                    <FormGroup
                      name="atributo"
                      label="Atributo:"
                      type="dropdown"
                      options={opcoesAtributos}
                    />
                    <FormGroup
                      name="treinamento"
                      label="Treinamento:"
                      type="dropdown"
                      options={opcoesTreinamento}
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
                <input type="submit" value="Salvar" />
              </form>
            </FormProvider>
          </Modal>,
          document.body
        )}
      <div className={`${styles[css]} ${styles.padrao}`}>
        <button className={styles.titulo} onClick={() => setModal(true)}>
          <p className={styles.nome}>{pericia.nome}</p>
        </button>
        <div className={styles.rolagem}>
          {css !== 'sidebar' && <p className={styles.treinamento}>{pericia.treinamento}</p>}
          <BotaoRolagem valor={pericia.valor} />
        </div>
      </div>
    </>
  )
}

export default CardPericia
