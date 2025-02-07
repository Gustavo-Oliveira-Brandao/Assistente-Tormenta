import BotaoModular from '@renderer/components/botao-modular/botao-modular'
import styles from './sidebar-ficha.module.scss'
import { PersonagemT20 } from '@renderer/@types/t20/Personagem'
import BarraRecurso from '@renderer/components/barra-recurso/barra-recurso'
import CardPericia from '@renderer/components/card-pericia/card-pericia'

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

        <div className={styles.barrasRecurso}>
          <BarraRecurso
            css="verde"
            atual={personagem.vida.valorAtual}
            maximo={personagem.vida.valorMaximo}
          />
          <BarraRecurso
            css="azul"
            atual={personagem.mana.valorAtual}
            maximo={personagem.mana.valorMaximo}
          />
        </div>

        <div className={styles.infoSecundaria}>
          <div className={styles.titulo}>
            <h2>Defesa</h2>
          </div>
          <div className={styles.recurso}>
            <img src="./icons/default/ca.svg" alt="Defesa" />
            <BotaoModular
              onClickEvent={teste}
              texto={personagem.defesa.valorAtual}
              css="recursoSecundario"
            />
          </div>
        </div>

        <div className={styles.infoSecundaria}>
          <div className={styles.titulo}>
            <h2>Deslocamento</h2>
          </div>
          <div className={styles.recurso}>
            <img src={'/icons/default/deslocamento.svg'} alt="Deslocamento" />
            <BotaoModular
              onClickEvent={teste}
              texto={personagem.deslocamento.caminhada}
              css="recursoSecundario"
            />
          </div>
        </div>

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
      </div>
    </aside>
  )
}

export default SidebarFicha
