import { HashRouter, Route, Routes } from 'react-router-dom'
import FichaPersonagem from './pages/ficha-personagem/ficha-personagem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MenuPrincipal } from './pages/menu-principal/menu-principal'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const queryClient = new QueryClient()

  //TODO: Criar uma homepage
  //TODO: Criar uma tela de criação de personagem
  //TODO: Buscar lib de validação de forms
  //TODO: Fazer um formulario guiado por etapas
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MenuPrincipal />} />
          <Route path="/personagem" element={<FichaPersonagem />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
