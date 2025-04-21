import styles from './sidebar-ficha.module.scss'
import BarraRecurso from '@renderer/components/barra-recurso/barra-recurso'
import CardPericia from '@renderer/components/card-pericia/pericia'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Modal from '../modal/modal'
import { ICriatura } from '@renderer/@types/t20/Criatura'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/store/store'
import { abrirModal, fecharModal } from '@renderer/store/slices/modalSlice'
import { Recurso } from '@renderer/components/card-recurso/card-recurso'
import { DetalhesForm } from '@renderer/components/forms/detalhes-form'

const SidebarFicha = ({ personagem }: { personagem: ICriatura }): JSX.Element => {
  useEffect(() => {}, [personagem])

  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)
  const dispatch = useDispatch()

  return (
    <aside className={styles.sidebar}>
      <div
        onClick={() => dispatch(abrirModal(`DETALHES_EDICAO_MODAL`))}
        className={styles.fotoPersonagem}
      >
        <img src={'./character.png'} alt="" />
        <span className={styles.opacidade}></span>
        <div className={styles.detalhes}>
          <div className={styles.detalhe}>
            <img src={'./icons/default/raca.svg'} alt="Raça" />
            <p>{personagem.raca}</p>
          </div>
          <div className={styles.detalhe}>
            <img src={'./icons/default/classe.svg'} alt="Raça" />
            <p>{personagem.classe}</p>
          </div>
          <div className={styles.detalhe}>
            <img src={'./icons/default/origem.svg'} alt="Raça" />
            <p>{personagem.origem}</p>
          </div>
          <div className={styles.detalhe}>
            <img src={'./icons/default/divindade.svg'} alt="Raça" />
            <p>{personagem.divindade}</p>
          </div>
        </div>
      </div>

      <div className={styles.personagemInfo}>
        <div className={styles.nome}>
          <p>{personagem.nome}</p>
        </div>
        <div className={styles.nivel}>
          <p>{personagem.nivel}</p>
        </div>
      </div>
      <div className={styles.barrasRecurso}>
        {personagem.recursos
          .filter((recurso) => recurso.categoria == 'vida' || recurso.categoria == 'mana')
          .sort((a, b) => {
            if (a.categoria < b.categoria) {
              return 1
            }
            if (a.categoria > b.categoria) {
              return -1
            }
            return 0
          })
          .map((recurso) => (
            <BarraRecurso key={recurso.id} recurso={recurso} />
          ))}
      </div>

      {personagem.recursos
        .filter((recurso) => recurso.categoria == 'defesa' || recurso.categoria == 'deslocamento')
        .map((recurso) => (
          <div key={recurso.id} className={styles.infoSecundaria}>
            <div className={styles.titulo}>
              <h2>{recurso.categoria}</h2>
            </div>
            <Recurso
              icone={`./icons/default/${recurso.categoria === 'defesa' ? 'ca' : 'deslocamento'}.svg`}
              recurso={recurso}
            />
          </div>
        ))}
      <div className={styles.infoSecundaria}>
        <div className={styles.titulo}>
          <h2>Iniciativa</h2>
        </div>
        <div className={styles.pericias}>
          {personagem.pericias.map((pericia) =>
            pericia.nome == 'iniciativa' ? (
              <CardPericia key={pericia.id} pericia={pericia} css="sidebar" />
            ) : null
          )}
        </div>
      </div>
      {modalAberto === 'DETALHES_EDICAO_MODAL' &&
        createPortal(
          <Modal titulo="Detalhes" onClose={() => dispatch(fecharModal())} height="fit-content">
            <DetalhesForm personagem={personagem} />
          </Modal>,
          document.body
        )}
    </aside>
  )
}

export default SidebarFicha
