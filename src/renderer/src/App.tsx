import { HashRouter, Route, Routes } from 'react-router-dom'
import FichaPersonagem from './pages/ficha-personagem/ficha-personagem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TelaSelecaoPersonagem from './pages/tela-selecao-personagem/tela-selecao-personagem'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/naoFeitoAinda" element={<TelaSelecaoPersonagem />} />
          <Route path="/" element={<FichaPersonagem idPersonagem={1} />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
