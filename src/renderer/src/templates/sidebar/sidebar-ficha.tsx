import { JSX, useState } from 'react'
import styles from './sidebar-ficha.module.scss'
import { IPersonagem } from '@renderer/@types/T20 GOTY/IPersonagem'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@renderer/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { FotoPersonagem } from '@renderer/components/foto-personagem/foto-personagem'
import { BarraRecurso } from '@renderer/components/barra-recurso/barra-recurso'

type SidebarFichaProps = {
  personagem: IPersonagem
}

export const SidebarFicha = ({ personagem }: SidebarFichaProps): JSX.Element => {
  const [abaSidebar, setAbaSidebar] = useState('STATUS')
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const modalAberto = useSelector((state: RootState) => state.modal.modalAberto)

  return (
    <aside className={styles.sidebar}>
      <FotoPersonagem personagem={personagem} />
      <div className={styles.recursos}>
        {personagem.recursos
          .filter((recurso) => recurso.categoria == 'vida' || recurso.categoria == 'mana')
          .map((recurso) => (
            <BarraRecurso
              key={recurso.id}
              css={recurso.categoria}
              valorAtual={recurso.valorAtual}
              valorMaximo={recurso.valorMaximo ?? 0}
            />
          ))}
      </div>
    </aside>
  )
}
