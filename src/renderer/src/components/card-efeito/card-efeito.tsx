import { IEfeito } from '@renderer/@types/T20 GOTY/IEfeito'
import styles from '@renderer/assets/styles/cards.module.scss'
import btnStyles from '@renderer/assets/styles/botoes.module.scss'
import { JSX, useState } from 'react'
import { Button, DialogTrigger } from 'react-aria-components'
import { StandaloneSwitch, SwitchFieldModular } from '../switch-field/switch-field'
import { useAtualizarEfeito, useDeletarEfeito } from '@renderer/hooks/mutations/useEfeitoMutation'
import { ModalModular } from '../modal/modal'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { efeitoSchema } from '@renderer/validators/schemas/efeito'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldsetModular } from '../fieldset/fieldset'
import { TextFieldModular } from '../text-field/text-field'
import { NumberFieldModular } from '../number-field/number-field'
import { OptionModular, SelectFieldModular } from '../select-field/select-field'
import {
  modificadoresStatusData,
  tiposModificadoresData
} from '@renderer/utils/common data/modificadoresData'
import { atributosData } from '@renderer/utils/common data/atributosData'
import { periciasData } from '@renderer/utils/common data/periciasData'
import { tiposDeslocamentosData } from '@renderer/utils/common data/deslocamentosData'

type CardEfeitosProps = {
  efeito: IEfeito
}

export const CardEfeito = ({ efeito }: CardEfeitosProps): JSX.Element => {
  const atualizarEfeito = useAtualizarEfeito()
  const removerEfeito = useDeletarEfeito()
  const [modalAberto, setModalAberto] = useState(false)

  const onChange = (estaAtivo: boolean): void => {
    const novoEfeito = { ...efeito, estaAtivo: estaAtivo }
    atualizarEfeito.mutate({ id: efeito.id, efeito: novoEfeito })
  }

  const onSubmit = (data): void => {
    const novoEfeito = { ...efeito, ...data }
    atualizarEfeito.mutate(novoEfeito)

    setModalAberto(false)
  }

  const methods = useForm<z.infer<typeof efeitoSchema>>({
    resolver: zodResolver(efeitoSchema),
    defaultValues: { ...efeito }
  })

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'modificadores'
  })

  const ehTipoProcurado = (indexTipoAtual: number, tipoProcurado: string): boolean => {
    const valorTipoAtual = methods.watch(`modificadores.${indexTipoAtual}.tipo`)
    if (valorTipoAtual == tipoProcurado) {
      return true
    }
    return false
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titulo}>
          <DialogTrigger isOpen={modalAberto} onOpenChange={setModalAberto}>
            <Button slot="trigger" className={styles.nome}>
              <h3 className="tormenta20Font">{efeito.nome}</h3>
            </Button>
            <ModalModular
              titulo={`${efeito.nome}`}
              placement="center"
              height="fit-content"
              width="800px"
            >
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <FieldsetModular legend={<p className="inter">Detalhes</p>}>
                    <TextFieldModular name="nome" label="Nome" placeholder="Forma selvagem" />
                  </FieldsetModular>
                  <FieldsetModular
                    legend={
                      <>
                        <p>Modificadores</p>
                        <Button
                          className={btnStyles.botaoAcompanhanteHeader}
                          onClick={() =>
                            append({
                              valor: 0,
                              tipo: 'atributos',
                              alvo: 'forca',
                              modoBonus: 'SOMA',
                              estaAtivo: false,
                              ehPorNivel: false
                            })
                          }
                        >
                          <img src="./icons/adicao.svg" alt="Adicionar" />
                          <p>Adicionar</p>
                        </Button>
                      </>
                    }
                  >
                    <div className={styles.modificadores}>
                      {fields.map((field, index) => (
                        <div className={styles.modificador} key={field.id}>
                          <NumberFieldModular
                            name={`modificadores.${index}.valor`}
                            label="Valor"
                            css="start"
                            placeholder="0"
                          />
                          <SelectFieldModular name={`modificadores.${index}.tipo`} label="Tipo">
                            {tiposModificadoresData.map((opt) => (
                              <OptionModular key={opt.value} value={opt.nome} name={opt.value} />
                            ))}
                          </SelectFieldModular>
                          <SelectFieldModular name={`modificadores.${index}.alvo`} label="Alvo">
                            {ehTipoProcurado(index, 'atributos') && (
                              <>
                                {atributosData.map((opt) => (
                                  <OptionModular
                                    key={opt.value}
                                    value={opt.nome}
                                    name={opt.value}
                                  />
                                ))}
                              </>
                            )}
                            {ehTipoProcurado(index, 'pericias') && (
                              <>
                                {periciasData.map((opt) => (
                                  <OptionModular key={opt.nome} value={opt.nome} name={opt.nome} />
                                ))}
                              </>
                            )}
                            {ehTipoProcurado(index, 'status') && (
                              <>
                                {modificadoresStatusData.map((opt) => (
                                  <OptionModular
                                    key={opt.value}
                                    value={opt.nome}
                                    name={opt.value}
                                  />
                                ))}
                              </>
                            )}
                            {ehTipoProcurado(index, 'deslocamentos') && (
                              <>
                                {tiposDeslocamentosData.map((opt) => (
                                  <OptionModular
                                    key={opt.value}
                                    value={opt.nome}
                                    name={opt.value}
                                  />
                                ))}
                              </>
                            )}
                          </SelectFieldModular>
                          <SwitchFieldModular
                            name={`modificadores.${index}.estaAtivo`}
                            label="Ativo?"
                          />
                          <SwitchFieldModular
                            name={`modificadores.${index}.ehPorNivel`}
                            label="P/ nivel?"
                          />
                          <Button className={styles.botaoAcao} onClick={() => remove(index)}>
                            <img src="./icons/delete.svg" alt="Remover modificador" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </FieldsetModular>
                  <Button type="submit">Salvar</Button>
                </form>
              </FormProvider>
            </ModalModular>
          </DialogTrigger>
        </div>
        <div className={styles.interacoes}>
          <StandaloneSwitch name="estaAtivo" estadoInicial={efeito.estaAtivo} onChange={onChange} />
          <Button className={styles.botaoAcao} onClick={() => removerEfeito.mutate(efeito.id)}>
            <img src="./icons/delete.svg" alt="Remover modificador" />
          </Button>
        </div>
      </div>
    </div>
  )
}
