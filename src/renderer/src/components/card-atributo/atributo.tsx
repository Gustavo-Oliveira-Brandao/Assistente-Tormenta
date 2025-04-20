import styles from './atributo.module.scss'
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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { rolarDados } from '@renderer/utils/rodarDados'

const Atributo = ({ atributo }: { atributo: IAtributo }): JSX.Element => {
  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

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
    dispatch(fecharModal())
  }

  return (
    <>
      <div className={styles.atributo}>
        <div className={styles.titulo}>
          <button onClick={() => dispatch(abrirModal(`ATRIBUTO_${atributo.nome}_EDICAO_MODAL`))}>
            {atributo.nome}
          </button>
        </div>
        <BotaoModular
          css="rollBtn"
          icone="./icons/dados/d20.svg"
          texto={atributo.valorAtual}
          onClickEvent={() => rolarDados()}
        />
      </div>
      {modalAberto == `ATRIBUTO_${atributo.nome}_EDICAO_MODAL` &&
        createPortal(
          <Modal
            titulo={atributo.nome}
            onClose={() => dispatch(fecharModal())}
            height="fit-content"
          >
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
                  <legend>Modificadores</legend>
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
                <input type="submit" value="Salvar" />
              </form>
            </FormProvider>
          </Modal>,
          document.body
        )}
    </>
  )
}

export default Atributo
