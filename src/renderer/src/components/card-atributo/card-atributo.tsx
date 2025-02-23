import { Atributo } from '@renderer/@types/t20/Atributo'
import styles from './card-atributo.module.scss'
import BotaoRolagem from '../botao-rolagem/botao-rolagem'
import { useState } from 'react'
import Modal from '@renderer/templates/modal/modal'
import { createPortal } from 'react-dom'
import FormularioModular from '@renderer/templates/formulario-modular/formulario-modular'
import FormGroup from '../form-group/form-group'
import BotaoModular from '../botao-modular/botao-modular'

const CardAtributo = ({ atributo }: { atributo: Atributo }): JSX.Element => {
  const [modal, abrirModal] = useState(false)

  const onEdit = (): void => {
    console.log('teste')
  }

  return (
    <>
      <div className={styles.atributo}>
        <div className={styles.titulo}>
          <button onClick={() => abrirModal(true)}>{atributo.nome}</button>
        </div>
        <BotaoRolagem valor={atributo.valor} />
      </div>
      {modal &&
        createPortal(
          <Modal titulo={atributo.nome} onClose={() => abrirModal(false)} height='fit-content'>
            <FormularioModular onSubmit={() => onEdit()}>
              <FormGroup
                question={{
                  value: atributo.bonus,
                  elementId: `${atributo.nome}Bonus`,
                  label: 'Bônus',
                  name: 'atributoBonus',
                  placeholder: String(atributo.bonus),
                  required: true,
                  type: 'number',
                  min: -99,
                  max: 100
                }}
              />
              <BotaoModular css="botaoConfirmacao" onClickEvent={() => onEdit()} texto={'Salvar'} />
            </FormularioModular>
          </Modal>,
          document.body
        )}
    </>
  )
}

export default CardAtributo
