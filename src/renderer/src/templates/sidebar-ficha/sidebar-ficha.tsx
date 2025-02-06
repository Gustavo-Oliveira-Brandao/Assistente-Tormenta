import BotaoModular from '@renderer/components/botao-modular/botao-modular'
import styles from './sidebar-ficha.module.scss'
import { PersonagemT20 } from '@renderer/@types/t20/Personagem'

const SidebarFicha = ({ personagem }: { personagem: PersonagemT20 }): JSX.Element => {
  const teste = (): void => {
    console.log('teste')
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.fotoPersonagem}>
        <img src={'./character.png'} alt="" />
        <span className={styles.opacidade}></span>
        <div className={styles.detalhes}>
          <BotaoModular
            icone={'./icons/default/raca.svg'}
            css="comIcone"
            texto={personagem.raca}
            onClickEvent={teste}
          />
          <BotaoModular
            icone={'./icons/default/classe.svg'}
            css="comIcone"
            texto={personagem.classe}
            onClickEvent={teste}
          />
          <BotaoModular
            icone={'./icons/default/divindade.svg'}
            onClickEvent={teste}
            css="comIcone"
            texto={personagem.divindade}
          />
          <BotaoModular
            icone={'./icons/default/origem.svg'}
            onClickEvent={teste}
            css="comIcone"
            texto={personagem.origem}
          />
        </div>
        <div className={styles.nome}>
          <p>{personagem.nome}</p>
        </div>
      </div>
    </aside>
  )
}

export default SidebarFicha
